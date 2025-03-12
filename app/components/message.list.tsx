"use client";

import { useState } from "react";
import MessageCard from "~/app/components/cards/message.card";
import MessageInput from "~/app/components/message.input";

interface Message {
  id: number;
  content: string;
  created_at?: string;
  updated_at?: string;
}

interface MessageListProps {
  messages: Message[];
}

export default function MessageList({ messages }: MessageListProps) {
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);

  return (
    <div>
      <div className="flex flex-wrap w-full justify-center sm:justify-baseline">
        {messages.map((message) => (
          <MessageCard 
            key={message.id} 
            id={message.id} 
            content={message.content} 
            onCustomize={(content) => setSelectedMessage(content)}
          />
        ))}
      </div>
    </div>
  );
}
