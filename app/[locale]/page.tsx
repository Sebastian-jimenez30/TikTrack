import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("HomePage");

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
  };
}

export default function HomePage() {
  return <div></div>;
}
