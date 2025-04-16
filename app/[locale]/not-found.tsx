import Image from "next/image";
import { getTranslations } from "next-intl/server";
import ROUTES from "~/constants/urls/urls";
import Button from "~/app/components/buttons/button";

export default async function NotFound() {
  const t = await getTranslations("NotFoundPage");
  return (
    <section className="bg-white flex items-center justify-center h-screen flex-col">
      <Image
        src="/icons/influencer-sad.png"
        alt="sad-influencer"
        width={200}
        height={200}
        priority={true}
      />
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 text-purple">
            404
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">
            {t("title")}
          </p>
          <p className="mb-4 text-lg font-light text-gray-500">
            {t("description")}
          </p>
          <Button variant="primary" href={ROUTES.HOME}>
            {t("goBack")}
          </Button>
        </div>
      </div>
      <Image
        src="/icons/influencer-sad.png"
        alt="sad-influencer"
        width={200}
        height={200}
        priority={true}
      />
    </section>
  );
}
