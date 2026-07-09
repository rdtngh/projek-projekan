import { useRef } from "react";
import "./UploadMaterialDialog.css";

function UploadMaterialDialog({ isOpen, onSelectFile, onCancel }) {
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      onSelectFile({
        fileName: file.name,
        fileType: file.type,
        fileData: reader.result,
      });
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="upload-material-overlay">
      <div className="upload-material-dialog" role="dialog" aria-modal="true">
        <h3 className="upload-material-title">Upload File Materi</h3>
        <input
          ref={fileInputRef}
          type="file"
          className="upload-material-input"
          onChange={handleFileChange}
        />
        <div className="upload-material-actions">
          <button
            type="button"
            className="upload-material-btn upload-material-btn-cancel"
            onClick={onCancel}
          >
            Batal
          </button>
          <button
            type="button"
            className="upload-material-btn upload-material-btn-select"
            onClick={() => fileInputRef.current?.click()}
          >
            Pilih File
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadMaterialDialog;
