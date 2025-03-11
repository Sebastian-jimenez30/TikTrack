import { JSX } from "react";
import { getTranslations } from "next-intl/server";

import { messageController } from "~/src/interface-adapters/controllers/message.controller";

import MessageCard from "~/app/components/cards/message.card";
import MessageInput from "~/app/components/input";

interface IndexProps {
  params: Promise<{ page?: string }>;
}

export async function generateMetadata() {
  const t = await getTranslations("InfluencersIndexPage");

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
  };
}

export default async function Index({
  params,
}: IndexProps): Promise<JSX.Element> {
  const t = await getTranslations("InfluencersIndexPage");
  const pageData = await messageController.index({ params });
  const messages = pageData.messages;

  return (
    <div>
      <div>
        <h3 className="mb-8 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl text-center">Messaging Templates</h3>
        <div className="flex flex-wrap w-full justify-center sm:justify-baseline">
          {messages.map((message) => (
            <MessageCard 
                content={message.content} />
          ))}
        </div>
      </div>
      <div className="w-full flex justify-center mt-8">
        <MessageInput onSend={async (message) => {
          'use server';
          console.log('Sending message:', message);
        }} />
      </div>
    </div>
  );
}
