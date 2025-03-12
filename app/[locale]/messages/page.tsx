import { getTranslations } from "next-intl/server";
import { messageController } from "~/src/interface-adapters/controllers/message.controller";
import MessageList from "~/app/components/message.list";
import CreateMessage from "~/app/components/forms/create.message";

interface IndexProps {
  params: { page?: string };
}

export default async function Index({ params }: IndexProps) {
  const t = await getTranslations("MessagesPage");
  const pageData = await messageController.index();
  const messages = pageData.messages?.map(msg => ({
    ...msg,
    created_at: msg.created_at?.toISOString(),
    updated_at: msg.updated_at?.toISOString()
  })) || [];

  return (
    <div>
      <h3 className="mb-8 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-3xl text-center">
        {t("title")}
      </h3>
      {messages.length < 3 && <CreateMessage />}
      <MessageList messages={messages} />
    </div>
  );
}