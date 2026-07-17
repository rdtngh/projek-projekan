import "./DeleteExamDialog.css";

function DeleteExamDialog({ isOpen, onConfirm, onCancel, isLoading }) {
  if (!isOpen) return null;

  return (
    <div className="delete-exam-overlay">
      <div className="delete-exam-dialog">
        <div className="delete-exam-header">
          <h3 className="delete-exam-title">Hapus Soal</h3>
        </div>

        <p className="delete-exam-message">
          Apakah Anda yakin ingin menghapus soal ini?
        </p>

        <div className="delete-exam-actions">
          <button
            type="button"
            className="delete-exam-btn delete-exam-btn-cancel"
            onClick={onCancel}
            disabled={isLoading}
          >
            Batal
          </button>
          <button
            type="button"
            className="delete-exam-btn delete-exam-btn-delete"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Menghapus..." : "Hapus"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteExamDialog;
