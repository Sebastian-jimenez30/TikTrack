"use client";

import { useTranslations } from "next-intl";
import Button from "~/app/components/buttons/button"; 
import ROUTES from "~/constants/urls/urls";

interface UserManagementCardProps {
  users: {
    id: number;
    email: string;
    name: string;
    role: "admin" | "user";
    status: "active" | "inactive";
    createdAt: Date;
    updatedAt: Date;
  }[];
}

export default function UserManagementCard({ users }: UserManagementCardProps) {
  const t = useTranslations("UserManagementPage");

  return (
    <div className="max-w-full w-full bg-white shadow-lg rounded-2xl p-10 border border-gray-200 mx-auto">
      <h2 className="text-4xl font-semibold text-purple text-center mb-10">
        {t("userManagement")}
      </h2>

      <div className="space-y-8">
        {users.map((user) => {
          // Definir la constante query para cada usuario
          const query = new URLSearchParams({ userId: user.id.toString() }).toString();

          // Construir la URL con la ruta base y la query string
          const manageUserRoute = `${ROUTES.MANAGEMENT_MANAGE}?${query}`;

          return (
            <div
              key={user.id}
              className="flex items-center gap-8 border-b border-gray-200 py-6 px-6 bg-gray-50 rounded-lg cursor-pointer"
            >
              <div className="flex-1">
                <p className="text-base text-gray-500 uppercase">{t("name")}</p>
                <p className="text-xl font-medium text-gray-800">{user.name}</p>
              </div>

              <div className="flex-1">
                <p className="text-base text-gray-500 uppercase">{t("email")}</p>
                <p className="text-xl font-medium text-gray-800">{user.email}</p>
              </div>

              <div className="flex-1">
                <p className="text-base text-gray-500 uppercase">{t("role")}</p>
                <p
                  className={`text-xl font-medium ${
                    user.role === "admin" ? "text-red-500" : "text-gray-800"
                  }`}
                >
                  {user.role === "admin" ? t("admin") : t("user")}
                </p>
              </div>

              <div className="flex-1">
                <p className="text-base text-gray-500 uppercase">{t("createdAt")}</p>
                <p className="text-xl font-medium text-gray-800">
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="flex-1">
                <p className="text-base text-gray-500 uppercase">{t("status")}</p>
                <p
                  className={`text-xl font-medium ${
                    user.status === "active" ? "text-green-500" : "text-gray-400"
                  }`}
                >
                  {user.status === "active" ? t("active") : t("inactive")}
                </p>
              </div>

              {/* Botón de gestionar */}
              <div className="flex-1 text-right">
                <Button
                  variant="primary"
                  href={manageUserRoute} 
                >
                  {t("manage")}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
