import { useState } from "react";

export default function LoginAdmin({ onLogin }) {
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === "hola123") {
      onLogin();
    } else {
      alert("❌ Contraseña incorrecta");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-neutral-900">
      <form
        onSubmit={handleSubmit}
        className="bg-neutral-800 p-6 rounded-xl flex flex-col gap-4 w-80"
      >
        <h2 className="text-xl font-semibold text-sky-400 text-center">
          Acceso Administrador
        </h2>

        <input
          type="password"
          placeholder="Contraseña"
          className="p-2 rounded bg-neutral-700 text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-sky-600 py-2 rounded text-white hover:bg-sky-700">
          Entrar
        </button>
      </form>
    </div>
  );
}
