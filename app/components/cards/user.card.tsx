"use client";

import { useTranslations } from "next-intl";
import UserIcon from "~/app/components/icons/user.icon";
import EmailIcon from "~/app/components/icons/email.icon";
import RoleIcon from "~/app/components/icons/role.icon";

interface UserCardProps {
  name: string;
  email: string;
  role: string;
}

export default function UserCard({ name, email, role }: UserCardProps) {
  const t = useTranslations("ProfilePage");

  const translatedRole = t(`roles.${role}`);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-96 border border-gray-200">
      <h2 className="text-xl font-bold text-center mb-4">{t("title")}</h2>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <UserIcon className="text-purple text-xl" />
          <p className="text-lg font-medium">
            <strong>{t("name")}:</strong> {name}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <EmailIcon className="text-purple text-xl" />
          <p className="text-lg font-medium">
            <strong>{t("email")}:</strong> {email}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <RoleIcon className="text-purple text-xl" />
          <p className="text-lg font-medium">
            <strong>{t("role")}:</strong> {translatedRole}
          </p>
        </div>
      </div>
    </div>
  );
}
