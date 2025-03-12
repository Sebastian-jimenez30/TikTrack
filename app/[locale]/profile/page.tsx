import { cookies } from "next/headers";
import jwtUtil from "@/shared/utils/jwt.util";
import { userController } from "@/interface-adapters/controllers/user.controller";
import { getTranslations } from "next-intl/server";
import UserCard from "~/app/components/cards/user.card";

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

  const { user, is_success } = await userController.getProfile(userId);

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
