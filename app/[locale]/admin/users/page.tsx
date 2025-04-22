import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";
import UserManagementCard from "~/app/components/cards/UserManagementCard"; // Importamos la nueva card
import { userController } from "@/interface-adapters/controllers/user.controller"; // Importamos el controlador

export default async function UserManagementPage() {
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

  let usersResponse;
  try {
    usersResponse = await userController.getAllUsers(); 
  } catch  {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-xl font-bold text-red-500">{t("fetchError")}</p>
      </div>
    );
  }

  const is_success = usersResponse.pageData.is_success;
  const userList = usersResponse.pageData.users || [];

  if (!is_success || userList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-xl font-bold text-red-500">{t("noUsersFound")}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <UserManagementCard users={userList} /> 
    </div>
  );
}
