"use client";

import { useState, useTransition } from 'react';
import { useTranslations } from 'next-intl';
import { createMessage } from '~/app/[locale]/messages/actions';

export default function CreateMessage() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const t = useTranslations('Forms.message');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;

    startTransition(async () => {
      const result = await createMessage(message);
      if (result.success) {
        setMessage('');
        setError(null);
      } else {
        setError(result.error || 'Failed to create message');
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4 max-w-md mx-auto text-center">
      {error && (
        <div className="mb-4 p-2 text-red-500 bg-red-50 rounded">
          {error}
        </div>
      )}
      
      <div >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t('placeholder')}
          className="border p-2 rounded w-full mb-2 text-sm border-purple"
          disabled={isPending}
        />
        <button
          type="submit"
          className="bg-purple text-white font-semibold transition-all px-4 py-2 rounded hover:bg-darkPurple text-sm"
          disabled={isPending || !message.trim()}
        >
          {t('saveTemplate')}
        </button>
      </div>
    </form>
  );
} 