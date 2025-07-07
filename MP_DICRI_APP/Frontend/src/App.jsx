import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Expedientes from "./pages/expedientes";
import Indicios from "./pages/indicios";
import Usuarios from "./pages/usuarios";
import Reportes from "./pages/reportes";
import ProtectedRoute from "./components/protectedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }/>
          <Route
            path="/usuarios"
            element={
              <ProtectedRoute roles={["Administrador"]}>
                <Usuarios />
              </ProtectedRoute>
            }/>
          <Route
            path="/expedientes"
            element={
              <ProtectedRoute roles={["tecnico","coordinador","Administrador"]}>
                <Expedientes />
              </ProtectedRoute>
            }/>
          <Route path="/expedientes/:id_expediente/indicios" 
          element={
          <Indicios />} />
          <Route
            path="/reportes"
            element={
              <ProtectedRoute allowedRoles={["coordinador", "Administrador"]}>
                <Reportes />
              </ProtectedRoute>}/>
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}


export default App;
