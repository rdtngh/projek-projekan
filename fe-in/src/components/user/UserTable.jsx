import "./UserTable.css";

function UserTable({ users, onEdit, onDelete }) {
  return (
    <div className="user-table-wrap">
      <table className="user-table">
        <thead>
          <tr>
            <th>No</th>
            <th>User</th>
            <th>ID</th>
            <th>Departemen</th>
            <th>Role</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr key={user.id} className={user.role === "Super Admin" ? "row-super" : ""}>
              <td>{idx + 1}</td>
              <td>{user.user}</td>
              <td>{user.userId}</td>
              <td>{user.department}</td>
              <td>{user.role}</td>
              <td>
                <div className="user-table-actions">
                  <button className="btn-edit" type="button" onClick={() => onEdit(user)}>
                    Edit
                  </button>
                  {user.role === "Super Admin" ? (
                    <span className="muted">Tidak Bisa Dihapus</span>
                  ) : (
                    <button className="btn-delete" type="button" onClick={() => onDelete(user.id)}>
                      Hapus
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
