import ROUTES from "~/constants/urls/urls";
import ROUTES_API from "~/constants/urls/api.urls";
import InfluencerCard from "~/app/components/cards/influencer.card";
import WarningIcon from "~/app/components/icons/warning.icon";
import Pagination from "~/app/components/pagination";
import axios from "axios";
import { JSX } from "react";
import { getTranslations } from "next-intl/server";
import FilterBar from "~/app/components/forms/filterBar";
import SearchBar from "~/app/components/forms/searchBar";

interface ReportedProps {
  searchParams: {
    page?: string;
    city?: string;
    followers?: string;
    engagementVisualizationRate?: string;
    updatedAt?: string;
  };
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
  const t = await getTranslations("InfluencersReportedPage");

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
  };
}

export default async function Reported({
  searchParams,
}: ReportedProps): Promise<JSX.Element> {
  const t = await getTranslations("InfluencersReportedPage");
  const translationKeyFilter = "FiltersInfluencer";
  const safeParams = Object.fromEntries(
    Object.entries(await searchParams).filter(
      ([, value]) => typeof value === "string"
    ) as [string, string][]
  );
  const query = new URLSearchParams(safeParams).toString();
  const paginationCurrentNumber = parseInt(safeParams.page || "1");
  const pageData = (
    await axios.get(ROUTES_API.INFLUENCER_REPORTED + `?${query}`)
  ).data.pageData;
  const influencers = pageData.influencers;
  const count = pageData.count;
  const start = pageData.start;
  const end = pageData.end;
  const hasNextPage = pageData.hasNextPage;
  const hasPreviousPage = pageData.hasPreviousPage;
  const filters = pageData.filters;

  return (
    <div>
      <h1 className="mb-10 text-4xl font-semibold leading-none tracking-tight md:text-5xl lg:text-6xl sm:text-left text-center">
        {t("title")} <WarningIcon className="text-lightPurple"></WarningIcon>
      </h1>
      <div className="flex flex-col w-full flex-wrap justify-center gap-x-4 xl:flex-row">
        <div className="flex-[0.40] my-5 flex items-center">
          <SearchBar className="w-full" />
        </div>
        <div className="flex-[0.60] my-5">
          <FilterBar filters={filters} translation={translationKeyFilter} />
        </div>
      </div>
      <div>
        <div className="grid w-full justify-center grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 items-center">
          {influencers.map((influencer: InfluencerOverview) => (
            <div key={influencer.username}>
              <InfluencerCard
                username={influencer.username}
                profilePicture={influencer.profilePicture}
                city={influencer.city}
                engagementVisualizationRate={
                  influencer.engagementVisualizationRate
                }
                followers={influencer.followers}
                updatedAt={influencer.updatedAt}
              />
            </div>
          ))}
        </div>
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
