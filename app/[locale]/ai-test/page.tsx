import TextboxWithService from "~/app/components/forms/ai.textbox";
import FireIcon from "~/app/components/icons/fire.icon";
import HeartIcon from "~/app/components/icons/heart.icon";
import EyeIcon from "~/app/components/icons/eye.icon";
import InlineCard from "~/app/components/cards/inline.card";
import { getTranslations } from "next-intl/server";

export default async function Index() {
  const t = await getTranslations("MessagesPage");

  return (
    <div className="mx-[100px]">
      <section>
        <h2 className="mb-8 text-3xl text-center font-bold leading-none tracking-tight md:text-4xl md:text-center lg:text-4xl lg:text-left ">
          {t("aiSuggestions")}
        </h2>
        <div className="flex flex-col flex-wrap justify-center lg:flex-row gap-6">
          <div className="flex flex-1 justify-center md:justify-center lg:justify-start flex-col">
            <TextboxWithService />
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
  );
}
