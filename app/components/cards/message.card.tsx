"use client";

import { useTransition, useState } from "react";
import { useTranslations } from "next-intl";
import ROUTES_API from "~/constants/urls/api.urls";
import Link from "next/link";
import axios from "axios";

interface MessageCardProps {
  id: number;
  content: string;
  isCustomizeLink?: boolean;
}

export default function MessageCard({
  id,
  content,
  isCustomizeLink,
}: MessageCardProps) {
  const [editing, setEditing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [newContent, setNewContent] = useState(content);
  const t = useTranslations("Cards.message");

  // Actualizar contenido
  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!newContent.trim()) {
      setError("Content cannot be empty");
      return;
    }

    startTransition(async () => {
      try {
        const result = await axios.put(ROUTES_API.MESSAGE_EDIT, {
          id,
          content: newContent,
        });

        if (result.status === 200) {
          setEditing(false);
          setError(null);
          setNewContent(result.data.content); 
          window.location.reload();
        } else {
          setError("Failed to update message");
        }
      } catch (error) {
        setError("Failed to update message");
      }
    });
  }

  // Eliminar mensaje
  async function handleDelete() {
    startTransition(async () => {
      try {
        const result = await axios.delete(ROUTES_API.MESSAGE_DELETE, {
          data: { id }, // Pasando el id en el cuerpo de la solicitud
        });
        if (result.status === 200) {
          setError(null); // No es necesario manejar error aquí
          alert("Message deleted successfully");
          window.location.reload(); // O hacer alguna otra acción como redirigir
        } else {
          setError("Failed to delete message");
        }
      } catch (error) {
        setError("Failed to delete message");
      }
    });
  }

  // Actualizar el estado del contenido mientras se edita
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewContent(e.target.value);
  };

  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm mx-5 my-2">
      {error && (
        <div className="mb-4 p-2 text-red-500 bg-red-50 rounded">{error}</div>
      )}

      {editing ? (
        <form onSubmit={handleUpdate} className="mt-3">
          <textarea
            name="content"
            value={newContent}
            onChange={handleContentChange}
            className="w-full mb-3 p-2 border rounded text-sm"
            disabled={isPending}
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-white text-purple border border-purple font-semibold transition-all mt-3 text-sm w-full px-2 py-1 rounded hover:bg-gray-200"
              disabled={isPending}
            >
              {t("update")}
            </button>
            <button
              type="button"
              onClick={handleDelete} // Cambiado de submit a button
              className="bg-darkGrey text-white font-semibold transition-all mt-3 text-sm w-full px-2 py-1 rounded hover:bg-black"
              disabled={isPending}
            >
              {t("delete")}
            </button>
          </div>
        </form>
      ) : (
        <p className="text-gray-700 text-sm">{content}</p>
      )}

      <div className="flex gap-2">
        {!editing && isCustomizeLink && (
          <Link href={`?selectedId=${id}`}>
            <button className="bg-white text-purple border border-purple font-semibold transition-all mt-3 text-sm w-full px-2 py-1 rounded hover:bg-gray-200">
              {t("customize")}
            </button>
          </Link>
        )}
        <button
          onClick={() => setEditing(!editing)}
          className="bg-purple text-white font-semibold transition-all mt-3 text-sm w-full px-2 py-1 rounded hover:bg-darkPurple"
          aria-label={editing ? t("cancel") : t("edit")}
        >
          {editing ? t("cancel") : t("edit")}
        </button>
      </div>
    </div>
  );
}