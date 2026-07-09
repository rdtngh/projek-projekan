import { useEffect, useRef, useState } from "react";
import "./ExamForm.css";
import addQuestionIcon from "../../assets/icons/icon-tambahsoal.svg";

function ExamForm({
  mode = "add",
  selectedQuestion,
  onSubmit,
  onCancel,
  errors,
  loading,
  resetSignal = 0,
}) {
  const questionInputRef = useRef(null);
  const [form, setForm] = useState({
    question: "",
    options: { a: "", b: "", c: "", d: "" },
    correctAnswer: "",
  });

  // Isi form saat ada selectedQuestion untuk editing
  useEffect(() => {
    if (mode === "edit" && selectedQuestion) {
      setForm({
        question: selectedQuestion.question,
        options: { ...selectedQuestion.options },
        correctAnswer: selectedQuestion.correctAnswer,
      });
    } else {
      resetFormData();
    }
  }, [selectedQuestion, mode]);

  useEffect(() => {
    if (mode !== "add" || resetSignal === 0) return;

    resetFormData();
    questionInputRef.current?.focus();
  }, [mode, resetSignal]);

  // Reset form data
  const resetFormData = () => {
    setForm({
      question: "",
      options: { a: "", b: "", c: "", d: "" },
      correctAnswer: "",
    });
  };

  // Handle input perubahan
  const handleQuestionChange = (e) => {
    setForm({ ...form, question: e.target.value });
  };

  const handleOptionChange = (key, value) => {
    setForm({
      ...form,
      options: { ...form.options, [key]: value },
    });
  };

  const handleCorrectAnswerChange = (e) => {
    setForm({ ...form, correctAnswer: e.target.value });
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form, mode === "edit" ? selectedQuestion.id : null);
  };

  // Handle cancel/reset
  const handleCancel = () => {
    resetFormData();
    onCancel();
  };

  const isEditMode = mode === "edit";
  const pageTitle = isEditMode ? "Edit Soal" : "Tambah Soal";
  const buttonText = isEditMode
    ? loading
      ? "Menyimpan..."
      : "Simpan Perubahan"
    : loading
      ? "Memproses..."
      : "Tambah Soal";

  return (
    <div className="exam-form-container">
      <div className="exam-form-header">
        <img src={addQuestionIcon} alt="" className="exam-form-icon" />
        <h2 className="exam-form-title">{pageTitle}</h2>
      </div>

      <form onSubmit={handleSubmit} className="exam-form">
        {/* Input Soal */}
        <div className="exam-form-group">
          <label htmlFor="question" className="exam-form-label">
            Masukkan Soal
          </label>
          <textarea
            id="question"
            ref={questionInputRef}
            className={`exam-form-input exam-form-textarea ${
              errors.question ? "error" : ""
            }`}
            placeholder="Ketik soal di sini..."
            value={form.question}
            onChange={handleQuestionChange}
            rows={3}
            disabled={loading}
          />
          {errors.question && (
            <span className="exam-form-error">{errors.question}</span>
          )}
        </div>

        {/* Input Options */}
        {["a", "b", "c", "d"].map((key, idx) => (
          <div key={key} className="exam-form-group">
            <label htmlFor={`option-${key}`} className="exam-form-label">
              Masukkan Option {String.fromCharCode(65 + idx)}
            </label>
            <input
              id={`option-${key}`}
              type="text"
              className={`exam-form-input ${
                errors[`option${String.fromCharCode(65 + idx)}`]
                  ? "error"
                  : ""
              }`}
              placeholder={`Option ${String.fromCharCode(65 + idx)}`}
              value={form.options[key]}
              onChange={(e) => handleOptionChange(key, e.target.value)}
              disabled={loading}
            />
            {errors[`option${String.fromCharCode(65 + idx)}`] && (
              <span className="exam-form-error">
                {errors[`option${String.fromCharCode(65 + idx)}`]}
              </span>
            )}
          </div>
        ))}

        {/* Dropdown Jawaban Benar */}
        <div className="exam-form-group">
          <label htmlFor="correctAnswer" className="exam-form-label">
            Jawaban Benar
          </label>
          <select
            id="correctAnswer"
            className={`exam-form-select ${
              errors.correctAnswer ? "error" : ""
            }`}
            value={form.correctAnswer}
            onChange={handleCorrectAnswerChange}
            disabled={loading}
          >
            <option value="">Pilih jawaban yang benar</option>
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
            <option value="d">Option D</option>
          </select>
          {errors.correctAnswer && (
            <span className="exam-form-error">{errors.correctAnswer}</span>
          )}
        </div>

        {/* Buttons */}
        <div className="exam-form-actions">
          {isEditMode && (
            <button
              type="button"
              className="exam-form-btn exam-form-btn-cancel"
              onClick={handleCancel}
              disabled={loading}
            >
              Batal
            </button>
          )}
          <button
            type="submit"
            className="exam-form-btn exam-form-btn-submit"
            disabled={loading}
          >
            {buttonText}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ExamForm;
