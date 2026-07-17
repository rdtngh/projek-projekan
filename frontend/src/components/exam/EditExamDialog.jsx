import ExamForm from "./ExamForm";
import "./EditExamDialog.css";

function EditExamDialog({
  isOpen,
  selectedQuestion,
  onSubmit,
  onCancel,
  errors,
  loading,
}) {
  if (!isOpen || !selectedQuestion) return null;

  return (
    <div className="edit-exam-overlay">
      <div className="edit-exam-dialog" role="dialog" aria-modal="true">
        <ExamForm
          mode="edit"
          selectedQuestion={selectedQuestion}
          onSubmit={onSubmit}
          onCancel={onCancel}
          errors={errors}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default EditExamDialog;
