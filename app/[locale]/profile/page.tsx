import { cookies } from "next/headers";
import jwtUtil from "@/shared/utils/jwt.util";
import { userController } from "@/interface-adapters/controllers/user.controller";
import { getTranslations } from "next-intl/server";
import UserCard from "~/app/components/cards/user.card";
import axios from "axios";
import ROUTES_API from "~/constants/urls/api.urls";
export default async function ProfilePage() {
  const t = await getTranslations("ProfilePage");
  const cookiesData = await cookies();
  const token = cookiesData.get("authToken")?.value;

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-xl font-bold text-red-500">{t("authError")}</p>
      </div>
    );
  }

  let userId;
  try {
    userId = jwtUtil.getUserIdFromToken(token);
  } catch {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-xl font-bold text-red-500">{t("tokenError")}</p>
      </div>
    );
  }
  
  const query = "userId=" + userId;
  const pageData = (await axios.get(ROUTES_API.PROFILE_SHOW+`?${query}`)).data.pageData;

  const user = pageData.user;
  const is_success = pageData.is_success;

  if (!is_success) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-xl font-bold text-red-500">{t("fetchError")}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <UserCard name={user.name} email={user.email} role={user.role} />
    </div>
  );
}
