import { useState, useEffect } from "react";

export default function UserForm({ onSave, userToEdit }) {
const [form, setForm] = useState({
  usuario: "",
  nombres_de_usuario: "",
  apellidos_de_usuario: "",
  email: "",
  telefono: "",
  tipo_de_usuario: "tecnico", // Por defecto
  password: "",
});
  // Inicializar el formulario si se está editando un usuario
  // Si userToEdit tiene datos, los asignamos al formulario 

 useEffect(() => {
  if (userToEdit) {
    setForm({
      usuario: userToEdit.usuario || "",
      nombres_de_usuario: userToEdit.nombres_de_usuario || "",
      apellidos_de_usuario: userToEdit.apellidos_de_usuario || "",
      email: userToEdit.email || "",
      telefono: userToEdit.telefono || "",
      tipo_de_usuario: userToEdit.tipo_de_usuario ,
      password: "",
    });
  }
}, [userToEdit]);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", form); // <-- Aquí para depurar los datos enviados
    onSave(form);
    setForm({
      usuario: "",
      nombres_de_usuario: "",
      apellidos_de_usuario: "",
      email: "",
      telefono: "",
      tipo_de_usuario: "tecnico",
      password: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <input
        name="usuario"
        placeholder="Usuario"
        value={form.usuario}
        onChange={handleChange}
        required
      />
      <input
        name="nombres_de_usuario"
        placeholder="Nombre completo"
        value={form.nombres_de_usuario}
        onChange={handleChange}
        required
      />
      <input
        name="apellidos_de_usuario"
        placeholder="Apellido(s)"
        value={form.apellidos_de_usuario}
        onChange={handleChange}
        required
      />
      <input
        name="email"
        placeholder="Correo electrónico"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        name="telefono"
        placeholder="Teléfono"
        value={form.telefono}
        onChange={handleChange}
        required
      />
      <select name="tipo_de_usuario" value={form.tipo_de_usuario} onChange={handleChange}>
        <option value="tecnico">tecnico</option>
        <option value="coordinador">coordinador</option>
        <option value="Administrador">Administrador</option>
      </select>

      <input
        name="password"
        placeholder="Contraseña"
        type="password"
        value={form.password}
        onChange={handleChange}
        required={!userToEdit} // Obligatorio solo al crear
      />
      
      <button type="submit">{userToEdit ? "Actualizar" : "Crear"}</button>
    </form>
  );
}
