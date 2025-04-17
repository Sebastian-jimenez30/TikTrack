import ROUTES from "~/constants/urls/urls";
import ROUTES_API from "~/constants/urls/api.urls";
import FeatureCard from "~/app/components/cards/feature.card";
import InfluencerSlider from "~/app/components/home/influencerSlider";
import Button from "~/app/components/buttons/button";
import FireIcon from "~/app/components/icons/fire.icon";
import Image from "next/image";
import axios from "axios";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("HomeIndexPage");

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
  };
}

export default async function Index() {
  const t = await getTranslations("HomeIndexPage");
  const pageData = (await axios.get(ROUTES_API.HOME_INDEX)).data.pageData;
  const influencers = pageData.influencers;

  return (
    <div>
      <section id="home-section" className="my-5">
        <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4 pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="col-span-6">
              <h1 className="text-4xl lg:text-7xl font-semibold mb-5 text-black md:4px lg:text-start text-center">
                {t("homeSection.title")}
              </h1>
              <p className="text-black lg:text-lg font-normal mb-10 lg:text-start text-center">
                {t("homeSection.description")}
              </p>
              <div className="flex justify-center lg:justify-start">
                <Button variant="primary" href={ROUTES.INFLUENCERS}>
                  {t("homeSection.button")}
                </Button>
              </div>
            </div>
            <div className="col-span-6 flex justify-center relative">
              <Image
                src="/home/hero.png"
                alt="home"
                width={2000}
                height={2000}
                priority={true}
              />
            </div>
          </div>
        </div>
      </section>
      <section id="features-section" className="bg-white my-20">
        <div
          className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md"
          id="about-section"
        >
          <div className="text-center mb-14">
            <p className="text-primary text-lg font-normal mb-3 tracking-widest uppercase">
              {t("featureSection.title")}
            </p>
            <h2 className="text-3xl lg:text-5xl font-semibold text-black lg:max-w-60% mx-auto">
              {t("featureSection.subtitle")}
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <FeatureCard
              icon={<FireIcon />}
              title={t("featureSection.feature1.title")}
              description={t("featureSection.feature1.description")}
            />
            <FeatureCard
              icon={<FireIcon />}
              title={t("featureSection.feature2.title")}
              description={t("featureSection.feature2.description")}
            />
            <FeatureCard
              icon={<FireIcon />}
              title={t("featureSection.feature3.title")}
              description={t("featureSection.feature3.description")}
            />
          </div>
        </div>
      </section>
      <section id="influencers-section" className="bg-primary/15">
        <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md">
          <div className="text-center">
            <p className="text-primary text-lg font-normal mb-3 tracking-widest uppercase">
              {t("influencerSection.title")}
            </p>
            <h2 className="text-3xl lg:text-5xl font-semibold text-black">
              {t("influencerSection.subtitle")}
            </h2>
          </div>
          <InfluencerSlider influencers={influencers} />
        </div>
      </section>
    </div>
  );
}
