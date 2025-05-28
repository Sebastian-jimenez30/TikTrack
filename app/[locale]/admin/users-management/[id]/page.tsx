import ROUTES_API from "~/constants/urls/api.urls";
import axios from "axios";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import UserUpdate from "~/app/components/forms/userUpdate";

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
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;

  const pathParams = await params;

  const pageData = (
    await axios.get(ROUTES_API.USER_MANAGEMENT_SHOW, {
      params: { id: pathParams.id },
      headers: {
        Cookie: `authToken=${token}`,
      },
    })
  ).data.pageData;
  if (!pageData.haveResults || !pageData.user) {
    notFound();
  }

  const user = pageData.user;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <UserUpdate user={user} />
    </div>
  );
}
