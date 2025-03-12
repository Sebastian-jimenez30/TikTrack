"use client";

import { useRouter } from "next/navigation";
import { useTransition, useState } from "react";
import { useTranslations } from "next-intl";
import { updateMessage, deleteMessage } from "~/app/[locale]/messages/actions";

interface MessageCardProps {
  id: number;
  content: string;
  onCustomize: (content: string) => void;
}

export default function MessageCard({ id, content, onCustomize }: MessageCardProps) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const t = useTranslations("Cards.message");

  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newContent = formData.get("content") as string;

    startTransition(async () => {
      const result = await updateMessage(id, newContent);
      if (result.success) {
        setEditing(false);
        setError(null);
      } else {
        setError(result.error || 'Failed to update message');
      }
    });
  }

  async function handleDelete() {
    startTransition(async () => {
      const result = await deleteMessage(id);
      if (!result.success) {
        setError(result.error || 'Failed to delete message');
      }
    });
  }

  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm mx-5 my-2">
      {error && (
        <div className="mb-4 p-2 text-red-500 bg-red-50 rounded">
          {error}
        </div>
      )}
      
      {editing ? (
        <form onSubmit={handleUpdate} className="mt-3">
          <textarea
            name="content"
            defaultValue={content}
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
              onClick={handleDelete} 
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
      { !editing && (
        <button 
          onClick={() => onCustomize(content)}
          className="bg-white text-purple border border-purple font-semibold transition-all mt-3 text-sm w-full px-2 py-1 rounded hover:bg-gray-200"
        >
          {t("customize")}
        </button>
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