import ROUTES from "~/constants/urls/urls";
import ROUTES_API from "~/constants/urls/api.urls";
import Pagination from "~/app/components/pagination";
import { cookies } from "next/headers";
import { JSX } from "react";
import axios from "axios";
import { getTranslations } from "next-intl/server";
import SearchBar from "~/app/components/forms/searchBar";
import FilterBar from "~/app/components/forms/filterBar";

interface ReportedProps {
  searchParams: { page?: string };
}

interface Influencer {
  id: number;
  username: string;
  profileName: string;
  city: string;
  followers: number;
  status: string;
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

  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;

  const pageData = (
    await axios.get(ROUTES_API.INFLUENCER_REPORTED + `?${query}`, {
      headers: { Cookie: `authToken=${token}` },
    })
  ).data.pageData;

  const influencers: Influencer[] = pageData.influencers;
  const count = pageData.count;
  const start = pageData.start;
  const end = pageData.end;
  const hasNextPage = pageData.hasNextPage;
  const hasPreviousPage = pageData.hasPreviousPage;
  const filters = pageData.filters;

  return (
    <div>
      <h1 className="mb-10 text-4xl font-semibold leading-none tracking-tight md:text-5xl lg:text-6xl sm:text-left text-center">
        {t("title")}
      </h1>
      <div className="flex flex-col w-full flex-wrap justify-center gap-x-4 xl:flex-row">
        <div className="flex-[0.40] my-5 flex items-center">
          <SearchBar className="w-full" />
        </div>
        <div className="flex-[0.60] my-5">
          <FilterBar filters={filters} translation={translationKeyFilter} />
        </div>
      </div>
      <div className="mx-[30px] relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 min-h-screen">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                {t("username")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("profileName")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("city")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("followers")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("status")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("action")}
              </th>
            </tr>
          </thead>
          <tbody className="align-top">
            {influencers.map((influencer) => {
              return (
                <tr
                  key={influencer.id}
                  className="bg-white border-b border-gray-200 hover:bg-gray-50"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {influencer.username}
                  </th>
                  <td className="px-6 py-4">{influencer.profileName}</td>
                  <td className="px-6 py-4">{influencer.city}</td>
                  <td className="px-6 py-4">{influencer.followers}</td>
                  <td
                    className={`px-6 py-4 ${
                      influencer.status === "active"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {influencer.status === "active"
                      ? t("active")
                      : t("inactive")}
                  </td>
                  <td className="flex items-center px-6 py-4 gap-2">
                    {influencer.status === "inactive" && (
                      <button
                        className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600"
                        onClick={async () => {
                          await axios.patch(
                            ROUTES_API.INFLUENCER_ACTIVATE +
                              `?id=${influencer.id}`,
                            {},
                            { headers: { Cookie: `authToken=${token}` } }
                          );
                          window.location.reload();
                        }}
                      >
                        {t("activate")}
                      </button>
                    )}
                    {influencer.status === "active" && (
                      <button
                        className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
                        onClick={async () => {
                          await axios.patch(
                            ROUTES_API.INFLUENCER_DEACTIVATE +
                              `?id=${influencer.id}`,
                            {},
                            { headers: { Cookie: `authToken=${token}` } }
                          );
                          window.location.reload();
                        }}
                      >
                        {t("deactivate")}
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pagination
          pathname={ROUTES.INFLUENCERS_REPORTED}
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
