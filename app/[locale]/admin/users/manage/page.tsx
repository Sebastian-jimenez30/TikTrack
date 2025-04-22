import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import ROUTES_API from "~/constants/urls/api.urls";
import axios from "axios";
import UpdateUserCard from "~/app/components/cards/updateuser.card"; // Importamos la nueva card

export default async function ManageUserPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) {
  const t = await getTranslations("UserManagementPage");
  const cookiesData = await cookies();
  const token = cookiesData.get("authToken")?.value;

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-xl font-bold text-red-500">{t("authError")}</p>
      </div>
    );
  }

  const userId = searchParams?.userId;

  if (!userId) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-xl font-bold text-red-500">{t("missingUserId")}</p>
      </div>
    );
  }

  let pageData;

  try {
    const response = await axios.get(
      `${ROUTES_API.PROFILE_SHOW}?userId=${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    pageData = response.data.pageData;
  } catch {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-xl font-bold text-red-500">{t("fetchError")}</p>
      </div>
    );
  }

  const user = pageData?.user;
  const is_success = pageData?.is_success;

  if (!is_success || !user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-xl font-bold text-red-500">{t("userNotFound")}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
        <UpdateUserCard
        initialData={{
            username: user.username,
            name: user.name,
            email: user.email,
            role: user.role,
        }}
        />
    </div>
  );
}
