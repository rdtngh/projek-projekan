import { useRef } from "react";
import "./UploadMaterialDialog.css";

function UploadMaterialDialog({ isOpen, onSelectFile, onCancel, multiple = false }) {
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  function handleFileChange(e) {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    if (multiple) {
      onSelectFile(files.map((file) => ({
        file,
        fileName: file.name,
        fileType: file.type,
      })));
      return;
    }

    const file = files[0];
    onSelectFile({
      file,
      fileName: file.name,
      fileType: file.type,
    });
  }

  return (
    <div className="upload-material-overlay">
      <div className="upload-material-dialog" role="dialog" aria-modal="true">
        <h3 className="upload-material-title">Upload File Materi</h3>
        <input
          ref={fileInputRef}
          type="file"
          multiple={multiple}
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
