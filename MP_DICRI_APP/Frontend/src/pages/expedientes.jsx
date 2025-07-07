import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import {
  getExpedientes,
  createExpediente,
  updateExpediente,
  deleteExpediente,
  aprobarExpediente,
  rechazarExpediente,
} from "../api/expedientes";
import ExpedienteForm from "../components/expedientesForm";
import ExpedienteList from "../components/expedientesList";


export default function Expedientes() {
  const { user, token } = useAuth();
  const [expedientes, setExpedientes] = useState([]);
  const [expedienteToEdit, setExpedienteToEdit] = useState(null);


  const loadExpedientes = async () => {
    const res = await getExpedientes(token);
    setExpedientes(res.data);
  };

  useEffect(() => {
    loadExpedientes();
  }, []);

  const handleSave = async (expediente) => {
    if (expedienteToEdit) {
      await updateExpediente(expedienteToEdit.id_expediente, expediente, token);
      setExpedienteToEdit(null);
    } else {
      await createExpediente(expediente, token);
    }
    loadExpedientes();
  };

  const handleEdit = (expediente) => setExpedienteToEdit(expediente);

  const handleDelete = async (id) => {
    if (window.confirm("¿Eliminar expediente?")) {
      await deleteExpediente(id, token);
      loadExpedientes();
    }
  };

  const handleAprobar = async (id) => {
    if (window.confirm("¿Aprobar expediente?")) {
      await aprobarExpediente(id, user.id_usuario, token);
      loadExpedientes();
    }
  };



  const handleRechazar = async (id) => {
    const razon = prompt("Justificación del rechazo:");
    if (razon) {
      await rechazarExpediente(id, user.id_usuario, razon, token);
      loadExpedientes();
    }
  };

  const handleCancel = () => setExpedienteToEdit(null);

  return (
    <div>
      <h2>Gestión de Expedientes</h2>
      {user?.tipo === "tecnico" && (
        <ExpedienteForm
          onSave={handleSave}
          expedienteToEdit={expedienteToEdit}
          onCancel={handleCancel}
          user={user}
        />
      )}
      
      <ExpedienteList
        expedientes={expedientes}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAprobar={handleAprobar}
        onRechazar={handleRechazar}
        user={user}
      />
    </div>
  );
}
