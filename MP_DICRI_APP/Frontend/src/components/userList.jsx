export default function UserList({ users, onEdit, onDelete }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Usuario</th>
          <th>Nombre</th>
          <th>Rol</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u) => (
          <tr key={u.id_usuario}>
            <td>{u.usuario}</td>
            <td>{u.nombres_de_usuario}</td>
            <td>{u.tipo_de_usuario}</td>
            <td>
              <button onClick={() => onEdit(u)}>Editar</button>
              <button onClick={() => onDelete(u.id_usuario)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
