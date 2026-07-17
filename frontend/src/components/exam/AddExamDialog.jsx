import "./AddExamDialog.css";

function AddExamDialog({ isOpen, onConfirm, onCancel, isLoading }) {
  if (!isOpen) return null;

  return (
    <div className="add-exam-overlay">
      <div className="add-exam-dialog" role="dialog" aria-modal="true">
        <h3 className="add-exam-title">Tambah Soal</h3>

        <p className="add-exam-message">
          Apakah Anda yakin ingin menambahkan soal ini?
        </p>
        <p className="add-exam-note">
          Pastikan seluruh data yang dimasukkan sudah benar.
        </p>

        <div className="add-exam-actions">
          <button
            type="button"
            className="add-exam-btn add-exam-btn-cancel"
            onClick={onCancel}
            disabled={isLoading}
          >
            Batal
          </button>
          <button
            type="button"
            className="add-exam-btn add-exam-btn-submit"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Menambahkan..." : "Tambah"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddExamDialog;
