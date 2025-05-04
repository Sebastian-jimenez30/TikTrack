import ROUTES from "~/constants/urls/urls";
import ROUTES_API from "~/constants/urls/api.urls";
import UserIcon from "~/app/components/icons/user.icon";
import EmailIcon from "~/app/components/icons/email.icon";
import LockIcon from "~/app/components/icons/lock.icon";
import RoleIcon from "~/app/components/icons/role.icon";
import axios from "axios";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

interface ShowProps {
  params: { id: string };
}

export async function generateMetadata() {
  const t = await getTranslations("UserManagementShowPage");

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
  };
}

export default async function Show({ params }: ShowProps) {
  const t = await getTranslations("UserManagementShowPage");

  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;

  const pathParams = await params;

  const pageData = (
    await axios.post(
      ROUTES_API.USER_MANAGEMENT_SHOW,
      { id: pathParams.id },
      {
        headers: {
          Cookie: `authToken=${token}`,
        },
      }
    )
  ).data.pageData;
  if (!pageData.haveResults || !pageData.user) {
    notFound();
  }

  const user = pageData.user;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form className="max-w-3xl w-full bg-white shadow-lg rounded-2xl p-8 border border-gray-200 mx-auto space-y-6">
        <h1 className="text-3xl font-semibold text-purple text-center mb-4">
          {t("editTitle")}
        </h1>

        <div className="flex items-start gap-6">
          <UserIcon className="text-purple text-3xl mt-1 mr-2" />
          <div className="w-full">
            <label className="text-base text-gray-500 uppercase tracking-wide">
              {t("name")}
            </label>
            <input
              type="text"
              name="name"
              defaultValue={user.name}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        <div className="flex items-start gap-6">
          <EmailIcon className="text-purple text-3xl mt-1 mr-1" />
          <div className="w-full">
            <label className="text-base text-gray-500 uppercase tracking-wide">
              {t("email")}
            </label>
            <input
              type="email"
              name="email"
              defaultValue={user.email}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        <div className="flex items-start gap-6">
          <LockIcon className="text-purple text-3xl mt-1 mr-2" />
          <div className="w-full">
            <label className="text-base text-gray-500 uppercase tracking-wide">
              {t("password")}
            </label>
            <input
              type="password"
              name="password"
              placeholder={t("passwordPlaceholder")}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        <div className="flex items-start gap-6">
          <RoleIcon className="text-purple text-3xl mt-1" />
          <div className="w-full">
            <label className="text-base text-gray-500 uppercase tracking-wide">
              {t("role")}
            </label>
            <select
              name="role"
              defaultValue={user.role}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
            >
              <option value="user">{t("roles.user")}</option>
              <option value="admin">{t("roles.admin")}</option>
            </select>
          </div>
        </div>

        <div className="flex items-start gap-6">
          <RoleIcon className="text-purple text-3xl mt-1" />
          <div className="w-full">
            <label className="text-base text-gray-500 uppercase tracking-wide">
              {t("status")}
            </label>
            <select
              name="status"
              defaultValue={user.status}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
            >
              <option value="active">{t("active")}</option>
              <option value="inactive">{t("inactive")}</option>
            </select>
          </div>
        </div>

        <div className="text-center mt-6 flex flex-col gap-4 items-center">
          <button
            type="submit"
            className="bg-purple text-white py-3 px-8 rounded-lg font-semibold hover:bg-darkPurple transition-all"
          >
            {t("save")}
          </button>
          <a
            href={ROUTES.USER_MANAGEMENT_INDEX}
            className="text-gray-500 hover:text-purple transition"
          >
            {t("cancel")}
          </a>
        </div>
      </form>
    </div>
  );
}
