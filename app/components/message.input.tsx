"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Button from "~/app/components/button";

interface MessageInputProps {
  onSend: (message: string) => void;
  selectedMessage: string | null; // ⬅️ Recibimos el mensaje seleccionado
}

export default function MessageInput({ onSend, selectedMessage }: MessageInputProps) {
  const [message, setMessage] = useState('');

  const t = useTranslations('MessagesPage.input');

  // ⬇️ Actualizar el input cuando cambia el mensaje seleccionado
  useEffect(() => {
    if (selectedMessage) {
      setMessage(selectedMessage);
    }
  }, [selectedMessage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="fixed bottom-0 left-0 w-full bg-white border-t p-4">
      <div className="max-w-4xl mx-auto flex gap-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t("placeholder")}
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button variant="primary" href="">{t("send")}</Button>
      </div>
    </form>
  );
}