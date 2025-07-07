import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";


export default function ProtectedRoute({ children, roles }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (roles && !roles.includes(user.tipo)) return <h2>No autorizado</h2>;
  return children;
}
