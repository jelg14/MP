import { useAuth } from "../hooks/useAuth";
import Sidebar from "../components/navBar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../styles/dashboard.css"; // Assuming you have a CSS file for styles


export default function Dashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (!user) {
        navigate("/", { replace: true });
        }
    }, [user, navigate]);

   return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <h2>Bienvenido, {user.nombres_de_usuario || user.usuario}</h2>
            <p>Rol: <strong>{user.tipo}</strong></p>
          </div>
          <button className="logout-btn" onClick={logout}>Cerrar sesión</button>
        </header>
        <section>
          <h3>Selecciona una opción del menú para continuar</h3>
        </section>
      </main>
    </div>
  );
}
