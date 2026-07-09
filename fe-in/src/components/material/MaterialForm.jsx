import { useEffect, useState } from "react";
import uploadIcon from "../../assets/icons/icon-upload.svg";
import "./MaterialForm.css";

const initialForm = {
  title: "",
  fileName: "",
  fileType: "",
  fileData: "",
};

function MaterialForm({
  mode = "add",
  material,
  onSubmit,
  onOpenUpload,
  selectedFileName,
  selectedFile,
  resetSignal = 0,
  loading = false,
}) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (mode === "edit" && material) {
      setForm({
        id: material.id,
        title: material.title,
        fileName: material.fileName,
        fileType: material.fileType || "",
        fileData: material.fileData || "",
      });
    } else {
      setForm(initialForm);
    }
    setErrors({});
  }, [mode, material]);

  useEffect(() => {
    if (selectedFileName === undefined) return;

    setForm((prev) => ({ ...prev, fileName: selectedFileName }));
  }, [selectedFileName]);

  useEffect(() => {
    if (!selectedFile) return;

    setForm((prev) => ({
      ...prev,
      fileName: selectedFile.fileName,
      fileType: selectedFile.fileType,
      fileData: selectedFile.fileData,
    }));
  }, [selectedFile]);

  useEffect(() => {
    if (mode !== "add" || resetSignal === 0) return;

    setForm(initialForm);
    setErrors({});
  }, [mode, resetSignal]);

  function validate() {
    const nextErrors = {};

    if (!form.fileName) nextErrors.fileName = "Upload File Materi wajib diisi";
    if (!form.title.trim()) nextErrors.title = "Judul Materi wajib diisi";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(form);
  }

  return (
    <form className="material-form" onSubmit={handleSubmit}>
      <div className="material-form-group">
        <label htmlFor={`${mode}-material-file`} className="material-form-label">
          Upload File Materi
        </label>
        <div className="material-upload-row">
          <input
            id={`${mode}-material-file`}
            value={form.fileName}
            readOnly
            className={`material-form-input ${errors.fileName ? "error" : ""}`}
            placeholder=""
          />
          <button
            type="button"
            className="material-upload-btn"
            onClick={onOpenUpload}
            disabled={loading}
            aria-label="Upload file materi"
          >
            <img src={uploadIcon} alt="" className="material-upload-icon" />
          </button>
        </div>
        {errors.fileName && (
          <span className="material-form-error">{errors.fileName}</span>
        )}
      </div>

      <div className="material-form-group">
        <label htmlFor={`${mode}-material-title`} className="material-form-label">
          Judul Materi
        </label>
        <input
          id={`${mode}-material-title`}
          value={form.title}
          onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
          className={`material-form-input ${errors.title ? "error" : ""}`}
          disabled={loading}
        />
        {errors.title && (
          <span className="material-form-error">{errors.title}</span>
        )}
      </div>

      <button type="submit" className="material-submit-btn" disabled={loading}>
        {mode === "edit" ? "Simpan" : "+ Tambah Materi"}
      </button>
    </form>
  );
}

export default MaterialForm;
