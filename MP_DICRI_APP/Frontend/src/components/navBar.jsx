// src/components/navBar.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "../styles/navBar.css"; // Assuming you have a CSS file for styles

export default function Sidebar() {
  const { user } = useAuth();

  return (
    <aside className="sidebar">
      <h2>DICRI</h2>
      <nav>
        <ul>
          {user.tipo === "tecnico" && (
            <>
              <li><Link to="/expedientes">Expedientes</Link></li>
            </>
          )}
          {user.tipo === "coordinador" && (
            <>
              <li><Link to="/expedientes">Expedientes</Link></li>
              <li><Link to="/reportes">Reportes</Link></li>
            </>
          )}
          {user.tipo === "Administrador" && (
            <>
              <li><Link to="/expedientes">Expedientes</Link></li>
              <li><Link to="/usuarios">Usuarios</Link></li>
              <li><Link to="/reportes">Reportes</Link></li>
            </>
          )}
        </ul>
      </nav>
    </aside>
  );
}
