import { useEffect, useState } from "react";
import uploadIcon from "../../assets/icons/icon-upload.svg";
import "./MaterialForm.css";

const initialForm = {
  title: "",
  fileName: "",
  fileType: "",
  file: null,
  items: [],
};

const titleFromFileName = (fileName) =>
  fileName
    .replace(/\.[^/.]+$/, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

function MaterialForm({
  mode = "add",
  material,
  onSubmit,
  onOpenUpload,
  selectedFileName,
  selectedFile,
  selectedFiles,
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
        file: material.file || null,
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
    if (!selectedFiles) return;

    if (selectedFiles.length === 0) {
      setForm((prev) => ({
        ...prev,
        fileName: "",
        fileType: "",
        file: null,
        items: [],
      }));
      return;
    }

    if (selectedFiles.length === 1) {
      const [selected] = selectedFiles;
      setForm((prev) => ({
        ...prev,
        file: selected.file,
        fileName: selected.fileName,
        fileType: selected.fileType,
        items: [],
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      file: null,
      fileName: `${selectedFiles.length} file dipilih`,
      fileType: "",
      items: selectedFiles.map((selected) => ({
        file: selected.file,
        fileName: selected.fileName,
        fileType: selected.fileType,
        title: titleFromFileName(selected.fileName),
      })),
    }));
  }, [selectedFiles]);

  useEffect(() => {
    if (!selectedFile) return;

    setForm((prev) => ({
      ...prev,
      file: selectedFile.file,
      fileName: selectedFile.fileName,
      fileType: selectedFile.fileType,
      items: [],
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

    if (form.items.length > 1) {
      const hasEmptyTitle = form.items.some((item) => !item.title.trim());
      if (hasEmptyTitle) nextErrors.items = "Semua judul materi wajib diisi";
    } else if (!form.title.trim()) {
      nextErrors.title = "Judul Materi wajib diisi";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function updateItemTitle(index, title) {
    setForm((prev) => ({
      ...prev,
      items: prev.items.map((item, itemIndex) =>
        itemIndex === index ? { ...item, title } : item
      ),
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(form.items.length > 1 ? { items: form.items } : form);
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

      {form.items.length > 1 ? (
        <div className="material-form-group">
          <span className="material-form-label">Judul Materi</span>
          <div className="material-bulk-list">
            {form.items.map((item, index) => (
              <div className="material-bulk-item" key={`${item.fileName}-${index}`}>
                <span className="material-bulk-index">{index + 1}</span>
                <div className="material-bulk-fields">
                  <span className="material-bulk-file">{item.fileName}</span>
                  <input
                    value={item.title}
                    onChange={(e) => updateItemTitle(index, e.target.value)}
                    className={`material-form-input ${errors.items && !item.title.trim() ? "error" : ""}`}
                    disabled={loading}
                  />
                </div>
              </div>
            ))}
          </div>
          {errors.items && (
            <span className="material-form-error">{errors.items}</span>
          )}
        </div>
      ) : (
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
      )}

      <button type="submit" className="material-submit-btn" disabled={loading}>
        {mode === "edit" ? "Simpan" : `+ Tambah Materi${form.items.length > 1 ? ` (${form.items.length})` : ""}`}
      </button>
    </form>
  );
}

export default MaterialForm;
