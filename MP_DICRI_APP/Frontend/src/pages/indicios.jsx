import { useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import {
  getIndiciosPorExpediente,
  createIndicio,
  updateIndicio,
  deleteIndicio,
} from "../api/indicios";
import IndicioForm from "../components/indiciosForm";
import IndicioList from "../components/indiciosList";
import "../styles/generalStyles.css"; // Asegúrate de importar tus estilos

export default function Indicios() {
  const { id_expediente } = useParams();
  const { user, token } = useAuth();
  const [indicios, setIndicios] = useState([]);
  const [indicioToEdit, setIndicioToEdit] = useState(null);

  const loadIndicios = async () => {
    const res = await getIndiciosPorExpediente(id_expediente, token);
    setIndicios(res.data);
  };

  useEffect(() => {
    loadIndicios();
    // eslint-disable-next-line
  }, [id_expediente]);

  const handleSave = async (indicio) => {
    if (indicioToEdit) {
      await updateIndicio(indicioToEdit.id_indicio, indicio, token);
      setIndicioToEdit(null);
    } else {
      await createIndicio(indicio, token);
    }
    loadIndicios();
  };

  const handleEdit = (indicio) => setIndicioToEdit(indicio);

  const handleDelete = async (id) => {
    if (window.confirm("¿Eliminar indicio?")) {
      await deleteIndicio(id, token);
      loadIndicios();
    }
  };

  const handleCancel = () => setIndicioToEdit(null);

  return (
    <div className="container">
      <h3>Indicios del expediente #{id_expediente}</h3>
      {user?.tipo?.toLowerCase() === "tecnico" && (
        <IndicioForm
          onSave={handleSave}
          indicioToEdit={indicioToEdit}
          onCancel={handleCancel}
          id_expediente={id_expediente}
          user={user}
        />
      )}
      <IndicioList
        indicios={indicios}
        onEdit={handleEdit}
        onDelete={handleDelete}
        user={user}
      />
    </div>
  );
}

// componente de lista de indicios