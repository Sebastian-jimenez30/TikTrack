import { influencerController } from "@/interface-adapters/controllers/influencer.controller";
import InfluencerCard from "~/app/components/cards/influencer.card";
import Pagination from "~/app/components/pagination";
import { JSX } from "react";
import { getTranslations } from "next-intl/server";

interface IndexProps {
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata() {
  const t = await getTranslations("InfluencersIndexPage");

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
  };
}

export default async function Index({
  searchParams,
}: IndexProps): Promise<JSX.Element> {
  const t = await getTranslations("InfluencersIndexPage");
  const pageData = await influencerController.index({ searchParams });
  const influencers = pageData.influencers;
  const count = pageData.count;
  const start = pageData.start;
  const end = pageData.end;
  const hasNextPage = pageData.hasNextPage;
  const hasPreviousPage = pageData.hasPreviousPage;

  return (
    <div>
      <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl text-center">
        {t("title")}🔥
      </h1>
      <div>
        <div className="flex flex-wrap w-full justify-center sm:justify-baseline">
          {influencers.map((influencer) => (
            <div key={influencer.getUsername()}>
              <InfluencerCard
                username={influencer.getUsername()}
                profilePicture={influencer.getProfilePicture()}
                city={influencer.getCity()}
                engagementVisualizationRate={influencer.getEngagementVisualizationRate()}
                totalFollowers={influencer.getFormattedTotalFollowers()}
                updatedAt={influencer.getUpdatedAt()}
              />
            </div>
          ))}
        </div>
        <Pagination
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
          totalElements={count}
          start={start}
          end={end}
        />
      </div>
    </div>
  );
}
