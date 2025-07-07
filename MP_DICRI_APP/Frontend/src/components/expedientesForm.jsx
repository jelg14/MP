import { useState, useEffect } from "react";

export default function ExpedienteForm({ onSave, expedienteToEdit, onCancel, user }) {
  const [form, setForm] = useState({
    no_expediente: "",
    Titulo: "",
    descripcion: "",
    id_tecnico: user?.id_usuario || "",
  });

  useEffect(() => {
    if (expedienteToEdit) {
      setForm({
        no_expediente: expedienteToEdit.no_expediente || "",
        Titulo: expedienteToEdit.Titulo || "",
        descripcion: expedienteToEdit.descripcion || "",
        id_tecnico: expedienteToEdit.id_tecnico || user?.id_usuario || "",
      });
    } else {
      setForm({
        no_expediente: "",
        Titulo: "",
        descripcion: "",
        id_tecnico: user?.id_usuario || "",
      });
    }
  }, [expedienteToEdit, user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    setForm({
      no_expediente: "",
      Titulo: "",
      descripcion: "",
      id_tecnico: user?.id_usuario || "",
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <input
        name="no_expediente"
        placeholder="No. expediente"
        value={form.no_expediente}
        onChange={handleChange}
        required
      />
      <input
        name="Titulo"
        placeholder="Título"
        value={form.Titulo}
        onChange={handleChange}
        required
      />
      <textarea
        name="descripcion"
        placeholder="Descripción"
        value={form.descripcion}
        onChange={handleChange}
        required
      />
      {/* id_tecnico es automático, no editable */}
      <input
        name="id_tecnico"
        value={form.id_tecnico}
        readOnly
        style={{ display: "none" }}
      />
      <button type="submit">{expedienteToEdit ? "Actualizar" : "Crear"}</button>
      {onCancel && <button type="button" onClick={onCancel}>Cancelar</button>}
    </form>
  );
}
