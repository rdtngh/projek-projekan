import { useEffect, useState } from "react";
import "./UserForm.css";
import addIcon from "../../assets/icons/icon-tambahpengguna.svg";

const initialForm = {
  user: "",
  userId: "",
  department: "",
  role: "",
};

const departments = [
  "IT",
  "HRD",
  "Keuangan",
  "Pelayanan",
  "Manajemen",
];

const roles = ["Super Admin", "Admin", "Karyawan"];

function UserForm({
  mode = "add",
  user,
  onSubmit,
  onCancel,
  submitLabel,
  disabled = false,
}) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (mode === "edit" && user) {
      setForm({
        id: user.id,
        user: user.user,
        userId: user.userId,
        department: user.department,
        role: user.role,
      });
    } else {
      setForm(initialForm);
    }
    setErrors({});
  }, [mode, user]);

  function validate() {
    const nextErrors = {};

    if (!form.user.trim()) nextErrors.user = "User wajib diisi";
    if (!form.userId.trim()) nextErrors.userId = "ID wajib diisi";
    if (!form.department) nextErrors.department = "Departemen wajib dipilih";
    if (!form.role) nextErrors.role = "Role wajib dipilih";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    onSubmit(form);

    if (mode === "add") {
      setForm(initialForm);
      setErrors({});
    }
  }

  const title = mode === "edit" ? "Edit Pengguna" : "Tambah Pengguna";
  const buttonText = submitLabel || (mode === "edit" ? "Simpan" : "+ Tambah Pengguna");

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <div className="user-form-header">
        <img src={addIcon} alt="" className="user-form-icon" />
        <h2 className="user-form-title">{title}</h2>
      </div>

      <div className="user-form-grid">
        <label className="user-form-group">
          <span>User</span>
          <input
            value={form.user}
            onChange={(e) => handleChange("user", e.target.value)}
            className={errors.user ? "error" : ""}
            placeholder="Masukkan user"
            disabled={disabled}
          />
          {errors.user && <span className="user-form-error">{errors.user}</span>}
        </label>

        <label className="user-form-group">
          <span>ID</span>
          <input
            value={form.userId}
            onChange={(e) => handleChange("userId", e.target.value)}
            className={errors.userId ? "error" : ""}
            placeholder="Masukkan ID"
            disabled={disabled}
          />
          {errors.userId && <span className="user-form-error">{errors.userId}</span>}
        </label>

        <label className="user-form-group">
          <span>Departemen</span>
          <select
            value={form.department}
            onChange={(e) => handleChange("department", e.target.value)}
            className={errors.department ? "error" : ""}
            disabled={disabled}
          >
            <option value="">Pilih departemen</option>
            {departments.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>
          {errors.department && (
            <span className="user-form-error">{errors.department}</span>
          )}
        </label>

        <label className="user-form-group">
          <span>Pilih Role</span>
          <select
            value={form.role}
            onChange={(e) => handleChange("role", e.target.value)}
            className={errors.role ? "error" : ""}
            disabled={disabled}
          >
            <option value="">Pilih role</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          {errors.role && <span className="user-form-error">{errors.role}</span>}
        </label>
      </div>

      <div className="user-form-actions">
        {mode === "edit" && (
          <button
            type="button"
            className="user-form-btn user-form-btn-cancel"
            onClick={onCancel}
            disabled={disabled}
          >
            Batal
          </button>
        )}
        <button type="submit" className="user-form-btn user-form-btn-submit" disabled={disabled}>
          {buttonText}
        </button>
      </div>
    </form>
  );
}

export default UserForm;
