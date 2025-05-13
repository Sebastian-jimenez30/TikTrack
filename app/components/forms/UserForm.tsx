"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface UserFormProps {
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
    status: string;
  };
  onSubmit: (
    formData: FormData
  ) => Promise<{ error?: string; success?: string }>;
}

export default function UserForm({ user, onSubmit }: UserFormProps) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(user.role);
  const [status, setStatus] = useState(user.status);
  const [actionResult, setActionResult] = useState<{
    error?: string;
    success?: string;
  } | null>(null);

  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (actionResult) {
      if (actionResult.error) {
        toast.error(actionResult.error);
      } else if (actionResult.success) {
        sessionStorage.setItem("notification", actionResult.success);
        sessionStorage.setItem("notificationType", "success");
        router.push("/admin/users-management");
      }
    }
  }, [actionResult, router]);

  async function clientSubmit(formData: FormData) {
    const result = await onSubmit(formData);
    setActionResult(result);
  }

  return (
    <form
      ref={formRef}
      action={clientSubmit}
      className="max-w-3xl w-full bg-white shadow-lg rounded-2xl p-8 border border-gray-200 mx-auto space-y-6"
    >
      <input type="hidden" name="id" value={user.id} />

      <div>
        <label className="text-base text-gray-500 uppercase tracking-wide">
          Nombre
        </label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
        />
      </div>

      <div>
        <label className="text-base text-gray-500 uppercase tracking-wide">
          Correo
        </label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
        />
      </div>

      <div>
        <label className="text-base text-gray-500 uppercase tracking-wide">
          Contraseña
        </label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Dejar vacío si no quieres cambiarla"
          className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
        />
      </div>

      <div>
        <label className="text-base text-gray-500 uppercase tracking-wide">
          Rol
        </label>
        <select
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
        >
          <option value="user">Usuario</option>
          <option value="admin">Administrador</option>
        </select>
      </div>

      <div>
        <label className="text-base text-gray-500 uppercase tracking-wide">
          Estado
        </label>
        <select
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
        >
          <option value="active">Activo</option>
          <option value="inactive">Inactivo</option>
        </select>
      </div>

      <div className="text-center mt-6">
        <button
          type="submit"
          className="bg-purple text-white py-3 px-8 rounded-lg font-semibold hover:bg-darkPurple transition-all"
        >
          Guardar cambios
        </button>
      </div>
    </form>
  );
}
