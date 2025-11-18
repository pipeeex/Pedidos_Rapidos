import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { useState } from "react";

import PaginaRastreo from "./pages/PaginaRastreo";
import AdminDashboard from "./pages/AdminDashboard";
import LoginAdmin from "./pages/LoginAdmin";

import "./App.css";

export default function App() {
  const [auth, setAuth] = useState(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-neutral-900 text-white">

        <nav className="flex gap-6 bg-neutral-800 px-6 py-4 shadow-md">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-lg font-semibold ${
                isActive ? "text-sky-400" : "text-gray-300 hover:text-white"
              }`
            }
          >
            Rastreo
          </NavLink>

          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `text-lg font-semibold ${
                isActive ? "text-sky-400" : "text-gray-300 hover:text-white"
              }`
            }
          >
            Panel Admin
          </NavLink>
        </nav>

        <main className="p-10">
          <Routes>
            <Route path="/" element={<PaginaRastreo />} />

            {/* Si NO está autenticado → mostrar LoginAdmin */}
            <Route
              path="/admin"
              element={
                auth ? (
                  <AdminDashboard />
                ) : (
                  <LoginAdmin onLogin={() => setAuth(true)} />
                )
              }
            />

            <Route
              path="*"
              element={
                <div className="text-center mt-10 text-gray-400 text-lg">
                  ❌ Página no encontrada
                </div>
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
