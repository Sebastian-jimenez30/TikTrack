"use client"; 

import { useState } from "react";
import { useRouter } from "next/navigation";
import SignInCard from "~/app/components/cards/signin.card";

export default function SignInPage() {
  const router = useRouter();

  // Estados para manejar el formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Función para manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        // Guardar el token en localStorage
        localStorage.setItem("authToken", result.token);

        // Redirigir al home después de iniciar sesión
        router.push("/");
      } else {
        setError(result.message || "Error en el inicio de sesión");
      }
    } catch {
      setError("Error en la solicitud");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SignInCard
      email={email}
      password={password}
      error={error}
      loading={loading}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onSubmit={handleSubmit}
    />
  );
}