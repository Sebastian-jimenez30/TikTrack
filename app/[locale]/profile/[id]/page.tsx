import ROUTES_API from "~/constants/urls/api.urls";
import UserCard from "~/app/components/cards/user.card";
import { cookies } from "next/headers";
import axios from "axios";
import { getTranslations } from "next-intl/server";

interface ShowProps {
  params: { id: string };
}

export async function generateMetadata() {
  const t = await getTranslations("ProfilePage");

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
    await axios.post(ROUTES_API.PROFILE_SHOW, {
      id: pathParams.id,
      headers: { Cookie: `authToken=${token}` },
    })
  ).data.pageData;

  const user = pageData.user;
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <UserCard name={user.name} email={user.email} role={user.role} />
    </div>
  );
}
