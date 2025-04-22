import ROUTES from "~/constants/urls/urls";
import ROUTES_API from "~/constants/urls/api.urls";
import InfluencerCard from "~/app/components/cards/influencer.card";
import Pagination from "~/app/components/pagination";
import FireIcon from "~/app/components/icons/fire.icon";
import axios from "axios";
import { JSX } from "react";
import { getTranslations } from "next-intl/server";
import NotificationSessionStorage from "~/app/components/notificationSessionStorage";
import ComparisonWrapper from "~/app/components/comparison/comparison.wrapper";


interface IndexProps {
  searchParams: { page?: string };
}

interface InfluencerOverview {
  username: string;
  profilePicture: string;
  city: string;
  engagementVisualizationRate: number;
  followers: string;
  updatedAt: string;
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
  const safeParams = Object.fromEntries(
    Object.entries(await searchParams).filter(
      ([, value]) => typeof value === "string"
    ) as [string, string][]
  );
  const query = new URLSearchParams(safeParams).toString();
  const paginationCurrentNumber = parseInt(safeParams.page || "1");
  const pageData = (await axios.get(ROUTES_API.INFLUENCER_INDEX + `?${query}`))
    .data.pageData;
  const influencers = pageData.influencers;
  const count = pageData.count;
  const start = pageData.start;
  const end = pageData.end;
  const hasNextPage = pageData.hasNextPage;
  const hasPreviousPage = pageData.hasPreviousPage;

  return (
    <div>
      <NotificationSessionStorage />
      <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl text-center">
        {t("title")} <FireIcon className="text-lightPurple" />
      </h1>
      <div>
        <ComparisonWrapper influencers={influencers} />
        <Pagination
          pathname={ROUTES.INFLUENCERS}
          page={paginationCurrentNumber}
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