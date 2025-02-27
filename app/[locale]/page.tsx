import { getTranslations } from "next-intl/server";
import Index from "@/interface-adapters/views/user-interface/home/index";

export async function generateMetadata() {
  const t = await getTranslations("HomePage");

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
  };
}

export default function HomePage() {
  return <Index />;
}
