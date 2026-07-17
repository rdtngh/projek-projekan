import "./MaterialConfirmDialog.css";

function MaterialConfirmDialog({
  isOpen,
  title,
  message,
  note,
  confirmLabel,
  variant = "success",
  onConfirm,
  onCancel,
  loading = false,
}) {
  if (!isOpen) return null;

  return (
    <div className="material-confirm-overlay">
      <div className="material-confirm-dialog" role="dialog" aria-modal="true">
        <h3 className="material-confirm-title">{title}</h3>
        <p className="material-confirm-message">{message}</p>
        {note && <p className="material-confirm-note">{note}</p>}

        <div className="material-confirm-actions">
          <button
            type="button"
            className="material-confirm-btn material-confirm-btn-cancel"
            onClick={onCancel}
            disabled={loading}
          >
            Batal
          </button>
          <button
            type="button"
            className={`material-confirm-btn material-confirm-btn-${variant}`}
            onClick={onConfirm}
            disabled={loading}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MaterialConfirmDialog;
