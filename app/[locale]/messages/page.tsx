import ROUTES from "~/constants/urls/urls";
import ROUTES_API from "~/constants/urls/api.urls";
import CreateMessage from "~/app/components/forms/create.message";
import TextboxWithService from "~/app/components/forms/ai.textbox";
import FireIcon from "~/app/components/icons/fire.icon";
import HeartIcon from "~/app/components/icons/heart.icon";
import EyeIcon from "~/app/components/icons/eye.icon";
import InlineCard from "~/app/components/cards/inline.card";
import axios from "axios";
import { JSX } from "react";
import { getTranslations } from "next-intl/server";
import { useState } from "react";
import MessageCard from "~/app/components/cards/message.card";
import Link from "next/link";

interface Message {
  id: number;
  content: string;
  created_at?: string;
  updated_at?: string;
}

interface Props {
  searchParams: { selectedId?: string };
}

export default async function MessagesPage({ searchParams }: Props) {
  const t = await getTranslations("MessagesIndexPage");
  const pageData = (await axios.get(ROUTES_API.MESSAGE_INDEX)).data.pageData;
  const messages: Message[] = pageData.messages;

  const selectedMessage = messages.find(
    (msg) => msg.id === Number(searchParams.selectedId)
  );

  return (
    <div>
      <h3 className="mb-8 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-3xl text-center">
        {t("title")}
      </h3>
      {messages.length < 3 && <CreateMessage />}

      <div className="flex flex-wrap">
        {messages.map((msg) => (
          <MessageCard
            key={msg.id}
            id={msg.id}
            content={msg.content}
            isCustomizeLink
          />
        ))}
      </div>

      <div className="mx-[100px]">
        <section>
          <h2 className="mb-8 text-3xl text-center font-bold leading-none tracking-tight md:text-4xl md:text-center lg:text-4xl lg:text-left ">
            {t("aiSuggestions")}
          </h2>
          <div className="flex flex-col flex-wrap justify-center lg:flex-row gap-6">
            <div className="flex flex-1 justify-center md:justify-center lg:justify-start flex-col">
              <TextboxWithService selectedMessageContent={selectedMessage?.content} />
            </div>
            <div className="flex flex-1 justify-center flex-col items-center flex-wrap ml-5 my-5 lg:my-0 gap-6">
              <InlineCard
                icon={<FireIcon className="text-5xl mr-5 text-lightPurple" />}
                description={t("communicationDescription")}
              />
              <InlineCard
                icon={<HeartIcon className="text-5xl mr-5 text-lightPurple" />}
                description={t("connectionDescription")}
              />
              <InlineCard
                icon={<EyeIcon className="text-5xl mr-5 text-lightPurple" />}
                description={t("standOutDescription")}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
