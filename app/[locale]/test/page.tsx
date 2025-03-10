// app/[locale]/test/page.tsx
"use client"; // Necesario para usar hooks y manejar estado

import { useState } from "react";

// Definir un tipo para la respuesta de la API
interface ApiResponse {
  message: string;
  [key: string]: any; // Permite propiedades adicionales
}

export default function TestPage() {
  // Estados para manejar los datos de las solicitudes
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Función para manejar las solicitudes a la API
  const handleApiCall = async (
    endpoint: string,
    method: string,
    body?: Record<string, any>
  ): Promise<void> => {
    try {
      const url = `/api/${endpoint}`;
      const options: RequestInit = {
        method,
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : undefined,
      };

      const res = await fetch(url, options);
      const data: ApiResponse = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Error en la solicitud");
      }

      setResponse(data);
      setError(null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
      setResponse(null);
    }
  };

  // Funciones para cada endpoint
  const handleSignUp = () => handleApiCall("auth/signup", "POST", { email, password, name });
  const handleLogIn = () => handleApiCall("auth/login", "POST", { email, password });
  const handleGetUserById = () => handleApiCall(`users/${userId}`, "GET");
  const handleUpdateProfile = () =>
    handleApiCall("users/update-profile", "PUT", { id: userId, email, name, password });
  const handleListUsers = () => handleApiCall("users/list", "GET");
  const handleUpdateUserRole = () =>
    handleApiCall("users/update-role", "PUT", { id: userId, role: "admin" });
  const handleUpdateUserStatus = () =>
    handleApiCall("users/update-status", "PUT", { id: userId, status: "active" });

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Página de Pruebas</h1>
      <p>Usa este formulario para probar las funcionalidades de la API.</p>

      {/* Formulario para registro e inicio de sesión */}
      <div style={{ marginBottom: "20px" }}>
        <h2>Registro e Inicio de Sesión</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <button onClick={handleSignUp} style={{ padding: "5px 10px", marginRight: "10px" }}>
          Registrarse
        </button>
        <button onClick={handleLogIn} style={{ padding: "5px 10px" }}>
          Iniciar Sesión
        </button>
      </div>

      {/* Formulario para obtener usuario por ID */}
      <div style={{ marginBottom: "20px" }}>
        <h2>Obtener Usuario por ID</h2>
        <input
          type="text"
          placeholder="ID del Usuario"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <button onClick={handleGetUserById} style={{ padding: "5px 10px" }}>
          Obtener Usuario
        </button>
      </div>

      {/* Formulario para actualizar perfil */}
      <div style={{ marginBottom: "20px" }}>
        <h2>Actualizar Perfil</h2>
        <input
          type="text"
          placeholder="ID del Usuario"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <input
          type="email"
          placeholder="Nuevo Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <input
          type="text"
          placeholder="Nuevo Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <input
          type="password"
          placeholder="Nueva Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <button onClick={handleUpdateProfile} style={{ padding: "5px 10px" }}>
          Actualizar Perfil
        </button>
      </div>

      {/* Botones para otras funcionalidades */}
      <div style={{ marginBottom: "20px" }}>
        <h2>Otras Funcionalidades</h2>
        <button onClick={handleListUsers} style={{ padding: "5px 10px", marginRight: "10px" }}>
          Listar Usuarios
        </button>
        <button onClick={handleUpdateUserRole} style={{ padding: "5px 10px", marginRight: "10px" }}>
          Actualizar Rol
        </button>
        <button onClick={handleUpdateUserStatus} style={{ padding: "5px 10px" }}>
          Actualizar Estado
        </button>
      </div>

      {/* Mostrar la respuesta de la API */}
      {response && (
        <div style={{ marginTop: "20px" }}>
          <h2>Respuesta de la API</h2>
          <pre style={{ background: "#f4f4f4", padding: "10px", borderRadius: "5px" }}>
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}

      {/* Mostrar errores */}
      {error && (
        <div style={{ marginTop: "20px", color: "red" }}>
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}