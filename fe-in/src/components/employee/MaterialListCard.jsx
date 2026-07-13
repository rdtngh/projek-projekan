import { Link } from "react-router-dom";
import materialListIcon from "../../assets/icons/icon-daftar-materi.svg";
import completedIcon from "../../assets/icons/icon-listceklis.svg";

function MaterialStatus({ completed }) {
  if (completed) {
    return (
      <img
        className="employee-material-status-icon"
        src={completedIcon}
        alt="Selesai"
      />
    );
  }

  return (
    <span
      className="employee-material-status-pending"
      role="img"
      aria-label="Belum selesai"
    />
  );
}

function MaterialRow({ material, disabled }) {
  const content = (
    <>
      <span className="employee-material-title">{material.title}</span>
      <MaterialStatus completed={!disabled && material.completed} />
    </>
  );

  if (disabled) {
    return (
      <div
        className="employee-material-row is-disabled"
        aria-disabled="true"
      >
        {content}
      </div>
    );
  }

  return (
    <Link
      className="employee-material-row"
      to={`/employee/material/${material.id}`}
      aria-label={`Buka ${material.title}`}
    >
      {content}
    </Link>
  );
}

function MaterialListCard({ materials, disabled = false }) {
  return (
    <section className="employee-material-card" aria-labelledby="material-list-title">
      <header className="employee-material-card-header">
        <img
          className="employee-material-card-icon"
          src={materialListIcon}
          alt=""
        />
        <h1 id="material-list-title">Daftar Materi</h1>
      </header>

      <div className="employee-material-list">
        {materials.map((material) => (
          <MaterialRow
            key={material.id}
            material={material}
            disabled={disabled}
          />
        ))}
      </div>
    </section>
  );
}

export default MaterialListCard;
