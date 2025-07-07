export default function IndicioList({ indicios, onEdit, onDelete, user }) {
  return (
    <table>
      <thead>
        <tr>
          <th>No. Indicio</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Color</th>
          <th>Tamaño</th>
          <th>Peso</th>
          <th>Unidad Peso</th>
          <th>Ubicación</th>
          <th>Observaciones</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {indicios.map((ind) => (
          <tr key={ind.id_indicio}>
            <td>{ind.no_indicio}</td>
            <td>{ind.nombre_indicio}</td>
            <td>{ind.descripcion}</td>
            <td>{ind.color}</td>
            <td>{ind.tamaño}</td>
            <td>{ind.peso}</td>
            <td>{ind.unidad_peso}</td>
            <td>{ind.ubicacion}</td>
            <td>{ind.observaciones}</td>
            <td>
              {user?.tipo?.toLowerCase() === "tecnico" && (
                <>
                  <button onClick={() => onEdit(ind)}>Editar</button>
                  <button onClick={() => onDelete(ind.id_indicio)}>Eliminar</button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
