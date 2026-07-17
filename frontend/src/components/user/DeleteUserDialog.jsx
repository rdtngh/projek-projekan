import "./DeleteUserDialog.css";

function DeleteUserDialog({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="delete-user-overlay">
      <div className="delete-user-dialog" role="dialog" aria-modal="true">
        <h3 className="delete-user-title">Hapus Pengguna</h3>
        <p className="delete-user-message">
          Apakah Anda yakin ingin menghapus pengguna ini?
        </p>
        <p className="delete-user-note">
          Data yang sudah dihapus tidak dapat dikembalikan.
        </p>

        <div className="delete-user-actions">
          <button type="button" className="delete-user-btn delete-user-btn-cancel" onClick={onCancel}>
            Batal
          </button>
          <button type="button" className="delete-user-btn delete-user-btn-delete" onClick={onConfirm}>
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteUserDialog;
