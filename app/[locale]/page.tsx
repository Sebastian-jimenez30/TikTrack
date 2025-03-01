import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("HomeIndexPage");

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
  };
}

export default function HomePage() {
  return <div></div>;
}
