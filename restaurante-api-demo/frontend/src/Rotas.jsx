// Rotas.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Sistema from "./App";

const isLoggedIn = localStorage.getItem("logado"); // "true" se estiver logado

function Rotas() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={isLoggedIn === "true" ? <Sistema /> : <Navigate to="/login" />}
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default Rotas;