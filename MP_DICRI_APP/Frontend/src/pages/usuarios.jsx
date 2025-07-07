import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../api/user";
import UserForm from "../components/userForm";
import UserList from "../components/userList";

export default function Usuarios() {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [userToEdit, setUserToEdit] = useState(null);

  const loadUsers = async () => {
    const res = await getUsers(token);
    setUsers(res.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSave = async (user) => {
  try {
    let data = { ...user };
    if (userToEdit && !user.password) {
      delete data.password;
    }
    if (userToEdit) {
      await updateUser(userToEdit.id_usuario, data, token);
      setUserToEdit(null);
    } else {
      await createUser(data, token);
    }
    loadUsers();
  } catch (error) {
    alert(error.response?.data?.error || "Error al guardar usuario");
    console.error(error);
  }
};


  const handleEdit = (user) => setUserToEdit(user);

  const handleDelete = async (id) => {
    if (window.confirm("¿Eliminar usuario?")) {
      await deleteUser(id, token);
      loadUsers();
    }
  };

  const handleCancel = () => setUserToEdit(null);

  return (
    <div>
      <h2>Gestión de Usuarios</h2>
      <UserForm onSave={handleSave} userToEdit={userToEdit} onCancel={handleCancel} />
      <UserList users={users} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}
