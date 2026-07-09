<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\SubmitTestRequest;
use App\Models\Certificate;
use App\Models\Test;
use App\Models\TestResult;
use App\Models\UserAnswer;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class TestController extends Controller
{
    public function show(Test $test): JsonResponse
    {
        $test->load('training');

        return response()->json([
            'success' => true,
            'data' => $test,
        ]);
    }

    public function questions(Test $test): JsonResponse
    {
        $questions = $test->questions()
            ->select('id', 'test_id', 'question', 'option_a', 'option_b', 'option_c', 'option_d', 'order_number')
            ->orderBy('order_number')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $questions,
        ]);
    }

    public function submit(SubmitTestRequest $request, Test $test): JsonResponse
    {
        $user = $request->user();
        $answers = collect($request->answers)->keyBy('question_id');
        $questions = $test->questions()->select('id', 'correct_answer')->get();

        $correct = 0;
        $wrong = 0;

        foreach ($questions as $question) {
            $selected = $answers->get($question->id);

            if ($selected && $selected['selected_answer'] === $question->correct_answer) {
                $correct++;
            } else {
                $wrong++;
            }

            if ($selected) {
                UserAnswer::updateOrCreate(
                    [
                        'user_id' => $user->id,
                        'question_id' => $question->id,
                    ],
                    [
                        'selected_answer' => $selected['selected_answer'],
                    ]
                );
            }
        }

        $score = $questions->count() > 0 ? round(($correct / $questions->count()) * 100) : 0;
        $status = $score >= $test->passing_score ? 'Lulus' : 'Tidak Lulus';

        $testResult = DB::transaction(function () use ($user, $test, $score, $correct, $wrong, $status) {
            $result = TestResult::updateOrCreate(
                [
                    'user_id' => $user->id,
                    'test_id' => $test->id,
                ],
                [
                    'score' => $score,
                    'correct_answers' => $correct,
                    'wrong_answers' => $wrong,
                    'status' => $status,
                    'started_at' => now(),
                    'finished_at' => now(),
                ]
            );

            if ($status === 'Lulus') {
                Certificate::firstOrCreate(
                    [
                        'user_id' => $user->id,
                        'test_result_id' => $result->id,
                    ],
                    [
                        'certificate_number' => strtoupper(Str::random(12)),
                        'file_path' => '',
                        'issued_at' => now(),
                    ]
                );
            }

            return $result;
        });

        return response()->json([
            'success' => true,
            'message' => 'Hasil tes berhasil disimpan.',
            'data' => [
                'score' => $score,
                'correct_answers' => $correct,
                'wrong_answers' => $wrong,
                'status' => $status,
                'test_result_id' => $testResult->id,
            ],
        ]);
    }
}
