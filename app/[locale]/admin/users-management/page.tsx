import ROUTES from "~/constants/urls/urls";
import ROUTES_API from "~/constants/urls/api.urls";
import Pagination from "~/app/components/pagination";
import { Link } from "~/i18n/routing";
import { cookies } from "next/headers";
import { JSX } from "react";
import axios from "axios";
import { getTranslations } from "next-intl/server";
import UserIcon from "~/app/components/icons/user.icon";

interface IndexProps {
  searchParams: { page?: string };
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  updatedAt: string;
  status: string;
}

export async function generateMetadata() {
  const t = await getTranslations("UserManagementIndexPage");

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
  };
}

export default async function Index({
  searchParams,
}: IndexProps): Promise<JSX.Element> {
  const t = await getTranslations("UserManagementIndexPage");

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
    await axios.get(ROUTES_API.USER_MANAGEMENT_INDEX + `?${query}`, {
      headers: { Cookie: `authToken=${token}` },
    })
  ).data.pageData;

  const users: User[] = pageData.users;
  const count = pageData.count;
  const start = pageData.start;
  const end = pageData.end;
  const hasNextPage = pageData.hasNextPage;
  const hasPreviousPage = pageData.hasPreviousPage;
  const emptyRows = pageData.emptyRows;

  return (
    <div>
      <h1 className="mb-10 text-4xl font-semibold leading-none tracking-tight md:text-5xl lg:text-6xl sm:text-left text-center">
        {t("title")} <UserIcon className="text-lightPurple" />
      </h1>
      <div className="mx-[30px] relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 min-h-screen">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                {t("name")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("email")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("role")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("updatedAt")}
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
            {users.map((user) => {
              return (
                <tr
                  key={user.id}
                  className="bg-white border-b border-gray-200 hover:bg-gray-50"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {user.name}
                  </th>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className={`px-6 py-4`}>
                    {user.role === "admin" ? t("admin") : t("user")}
                  </td>
                  <td className="px-6 py-4">{user.updatedAt}</td>
                  <td
                    className={`px-6 py-4 ${user.status === "active" ? "text-green-500" : "text-red-500"}`}
                  >
                    {user.status === "active" ? t("active") : t("inactive")}
                  </td>
                  <td className="flex items-center px-6 py-4">
                    <Link
                      href={{
                        pathname: `${ROUTES.USER_MANAGEMENT_DETAIL}`,
                        params: { id: user.id },
                      }}
                      className="font-medium text-purple hover:underline"
                    >
                      {t("manage")}
                    </Link>
                  </td>
                </tr>
              );
            })}
            {emptyRows.map((_: string, i: number) => (
              <tr
                key={`empty-${i}`}
                className="bg-white border-b border-gray-200"
              >
                <td className="px-6 py-4">&nbsp;</td>
                <td className="px-6 py-4"></td>
                <td className="px-6 py-4"></td>
                <td className="px-6 py-4"></td>
                <td className="px-6 py-4"></td>
                <td className="px-6 py-4"></td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          pathname={ROUTES.USER_MANAGEMENT_INDEX}
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
