import { useState, useEffect } from "react";

export default function IndicioForm({ onSave, indicioToEdit, onCancel, id_expediente, user }) {
  const [form, setForm] = useState({
    id_expediente: id_expediente,
    no_indicio: "",
    nombre: "",
    descripcion: "",
    color: "",
    tamaño: "",
    peso: "",
    unidad_peso: "",
    ubicacion: "",
    observaciones: "",
    id_tecnico: user?.id_usuario || "",
  });

  useEffect(() => {
    if (indicioToEdit) {
      setForm({
        id_expediente: indicioToEdit.id_expediente,
        no_indicio: indicioToEdit.no_indicio || "",
        nombre: indicioToEdit.nombre_indicio || "",
        descripcion: indicioToEdit.descripcion || "",
        color: indicioToEdit.color || "",
        tamaño: indicioToEdit.tamaño || "",
        peso: indicioToEdit.peso || "",
        unidad_peso: indicioToEdit.unidad_peso || "",
        ubicacion: indicioToEdit.ubicacion || "",
        observaciones: indicioToEdit.observaciones || "",
        id_tecnico: indicioToEdit.id_tecnico || user?.id_usuario || "",
      });
    } else {
      setForm({
        id_expediente: id_expediente,
        no_indicio: "",
        nombre: "",
        descripcion: "",
        color: "",
        tamaño: "",
        peso: "",
        unidad_peso: "",
        ubicacion: "",
        observaciones: "",
        id_tecnico: user?.id_usuario || "",
      });
    }
  }, [indicioToEdit, id_expediente, user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    setForm({
      id_expediente: id_expediente,
      no_indicio: "",
      nombre: "",
      descripcion: "",
      color: "",
      tamaño: "",
      peso: "",
      unidad_peso: "",
      ubicacion: "",
      observaciones: "",
      id_tecnico: user?.id_usuario || "",
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <input
        name="no_indicio"
        placeholder="No. Indicio"
        value={form.no_indicio}
        onChange={handleChange}
        required
        disabled={!!indicioToEdit} // Solo editable al crear
      />
      <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
      <textarea name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange} required />
      <input name="color" placeholder="Color" value={form.color} onChange={handleChange} />
      <input name="tamaño" type="number" step="0.01" placeholder="Tamaño" value={form.tamaño} onChange={handleChange} />
      <input name="peso" type="number" step="0.001" placeholder="Peso" value={form.peso} onChange={handleChange} />
      <input name="unidad_peso" placeholder="Unidad de peso" value={form.unidad_peso} onChange={handleChange} />
      <input name="ubicacion" placeholder="Ubicación" value={form.ubicacion} onChange={handleChange} />
      <textarea name="observaciones" placeholder="Observaciones" value={form.observaciones} onChange={handleChange} />
      <button type="submit">{indicioToEdit ? "Actualizar" : "Agregar"}</button>
      {onCancel && <button type="button" onClick={onCancel}>Cancelar</button>}
    </form>
  );
}
