"use client"; 

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation"; 
import SignUpCard from "~/app/components/cards/signup.card";

export default function SignUpPage() {
  const router = useRouter();
  const params = useParams(); 
  const locale = params.locale as string; 

  // Estados para manejar el formulario
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name: username }),
      });

      const result = await response.json();

      if (response.ok) {
        router.push(`/${locale}/sign-in`);
      } else {
        setError(result.message || "Error en el registro");
      }
    } catch {
      setError("Error en la solicitud");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SignUpCard
      username={username}
      email={email}
      password={password}
      error={error}
      loading={loading}
      onUsernameChange={setUsername}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onSubmit={handleSubmit}
    />
  );
}