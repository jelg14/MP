import { useState } from "react";

export default function ExpedientesSearch({ onSearch }) {
  const [id, setId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) onSearch(id);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <input
        type="number"
        min="1"
        placeholder="Buscar por ID de expediente"
        value={id}
        onChange={e => setId(e.target.value)}
      />
      <button type="submit">Buscar</button>
    </form>
  );
}
// este componente permite buscar un expediente por su ID.
// Utiliza un formulario simple con un campo de entrada para el ID y un botón de búsqueda