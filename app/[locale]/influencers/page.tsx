import ROUTES from "~/constants/urls/urls";
import ROUTES_API from "~/constants/urls/api.urls";
import Pagination from "~/app/components/shared/pagination.shared";
import FireIcon from "~/app/components/icons/fire.icon";
import axios from "axios";
import { JSX } from "react";
import { getTranslations } from "next-intl/server";
import NotificationSessionStorage from "~/app/components/shared/notificationSessionStorage.shared";
import ComparisonWrapper from "~/app/components/comparison/wrapper.comparison";
import SearchBar from "~/app/components/forms/searchBar.form";
import FilterBar from "~/app/components/forms/filterBar.form";
import FilterRedirectHandler from "~/app/components/shared/filterRedirectHandler.shared";
import SearchBarRedirectHandler from "~/app/components/shared/searchBarRedirectHandler.shared";

interface IndexProps {
  searchParams: Promise<{
    page?: string;
    city?: string;
    followers?: string;
    engagementVisualizationRate?: string;
    updatedAt?: string;
    search?: string;
  }>;
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
  const translationKeyFilter = "FiltersInfluencer";
  const safeParams = Object.fromEntries(
    Object.entries(await searchParams).filter(
      ([, value]) => typeof value === "string"
    ) as [string, string][]
  );
  const query = new URLSearchParams(safeParams).toString();
  const paginationCurrentNumber = parseInt(safeParams.page || "1");
  const filterCity = safeParams.city || undefined;
  const filterFollowers = safeParams.followers || undefined;
  const filterEngagementVisualizationRate =
    safeParams.engagementVisualizationRate || undefined;
  const filterUpdatedAt = safeParams.updatedAt || undefined;
  const search = safeParams.search || undefined;
  const pageData = (await axios.get(ROUTES_API.INFLUENCER_INDEX + `?${query}`))
    .data.pageData;
  const influencers = pageData.influencers;
  const count = pageData.count;
  const start = pageData.start;
  const end = pageData.end;
  const hasNextPage = pageData.hasNextPage;
  const hasPreviousPage = pageData.hasPreviousPage;
  const filters = pageData.filters;
  return (
    <div>
      <NotificationSessionStorage />
      <h1 className="mb-8 text-4xl font-semibold leading-none tracking-tight md:text-5xl lg:text-6xl sm:text-left text-center">
        {t("title")} <FireIcon className="text-lightPurple" />
      </h1>
      <div className="flex flex-col w-full flex-wrap justify-center gap-x-4 xl:flex-row">
        <div className="flex-[0.40] my-5 flex items-center">
          <SearchBarRedirectHandler />
          <SearchBar placeholder={t("search")} className="w-full" />
        </div>
        <div className="flex-[0.60] my-5">
          <FilterRedirectHandler />
          <FilterBar filters={filters} translation={translationKeyFilter} />
        </div>
      </div>
      <div>
        <ComparisonWrapper influencers={influencers} />
        <Pagination
          pathname={ROUTES.INFLUENCERS}
          page={paginationCurrentNumber}
          city={filterCity}
          followers={filterFollowers}
          engagementVisualizationRate={filterEngagementVisualizationRate}
          updatedAt={filterUpdatedAt}
          search={search}
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
