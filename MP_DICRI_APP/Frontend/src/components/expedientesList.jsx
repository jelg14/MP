import { useNavigate } from "react-router-dom";

export default function ExpedienteList({
  expedientes,
  onEdit,
  onDelete,
  onAprobar,
  onRechazar,
  user,
}) {
  const navigate = useNavigate();

  return (
    <table>
      <thead>
        <tr>
          <th>No. Expediente</th>
          <th>Título</th>
          <th>Descripción</th>
          <th>Fecha Registro</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {expedientes.map((exp) => (
          <tr key={exp.id_expediente}>
            <td>{exp.no_expediente}</td>
            <td>{exp.Titulo}</td>
            <td>{exp.descripcion}</td>
            <td>{exp.fecha_registro ? exp.fecha_registro.slice(0, 10) : ""}</td>
            <td>{exp.estado}</td>
            <td>
              {/* Botón para ver indicios */}
              {exp.estado?.toLowerCase() === "rechazado" && exp.razon_de_rechazo && (
                <span title={exp.razon_de_rechazo}>🛈</span>
              )}
              <button onClick={() => navigate(`/expedientes/${exp.id_expediente}/indicios`)}>Ver indicios</button>
              {/* Acciones según rol */}
              {user?.tipo?.toLowerCase() === "tecnico" && exp.estado?.toLowerCase() === "registrado" && (
                <>
                  <button onClick={() => onEdit(exp)}>Editar</button>
                  <button onClick={() => onDelete(exp.id_expediente)}>Eliminar</button>
                </>
              )}
              {user?.tipo?.toLowerCase() === "coordinador" && exp.estado?.toLowerCase() === "registrado" && (
                <>
                  <button onClick={() => onAprobar(exp.id_expediente)}>Aprobar</button>
                  <button onClick={() => onRechazar(exp.id_expediente)}>Rechazar</button>
                </>
              )}
              
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}


// Este componente muestra una lista de expedientes con opciones para editar, eliminar, aprobar o rechazar según el rol del usuario.
// Utiliza una tabla para mostrar los detalles de cada expediente y botones de acción según el estado