import ROUTES from "~/constants/urls/urls";
import ROUTES_API from "~/constants/urls/api.urls";
import InfluencerCard from "~/app/components/cards/influencer.card";
import Pagination from "~/app/components/pagination";
import SearchBar from "~/app/components/searchBar";
import FireIcon from "~/app/components/icons/fire.icon";
import axios from "axios";
import { JSX } from "react";
import { getTranslations } from "next-intl/server";

interface SearchResultsProps {
  searchParams: { search?: string; page?: string };
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
  const t = await getTranslations("InfluencersSearchPage");

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
  };
}

export default async function SearchResults({
  searchParams,
}: SearchResultsProps): Promise<JSX.Element> {
  const t = await getTranslations("InfluencersSearchPage");
  const safeParams = Object.fromEntries(
    Object.entries(await searchParams).filter(
      ([, value]) => typeof value === "string"
    ) as [string, string][]
  );
  const query = new URLSearchParams(safeParams).toString();
  const paginationCurrentNumber = parseInt(safeParams.page || "1");
  const pageData = (
    await axios.get(ROUTES_API.INFLUENCER_SEARCH + `?${query}`)
  ).data.pageData;
  const influencers = pageData.influencers;
  const count = pageData.count;
  const start = pageData.start;
  const end = pageData.end;
  const hasNextPage = pageData.hasNextPage;
  const hasPreviousPage = pageData.hasPreviousPage;

  return (
    <div>
      <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl text-center">
        {t("title")} <FireIcon className="text-lightPurple" />
      </h1>

      {/* No Matches Found */}
      {influencers.length === 0 && (
        <p className="text-center text-red-500">
          {t("noMatchesFound", { query: safeParams.search })}
        </p>
      )}

      {/* Influencers List */}
      <div className="flex flex-wrap w-full justify-center sm:justify-baseline">
        {influencers.map((influencer: InfluencerOverview) => (
          <div key={influencer.username}>
            <InfluencerCard
              username={influencer.username}
              profilePicture={influencer.profilePicture}
              city={influencer.city}
              engagementVisualizationRate={influencer.engagementVisualizationRate}
              followers={influencer.followers}
              updatedAt={influencer.updatedAt}
            />
          </div>
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        pathname={ROUTES.INFLUENCERS }
        page={paginationCurrentNumber}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
        totalElements={count}
        start={start}
        end={end}
      />
    </div>
  );
}