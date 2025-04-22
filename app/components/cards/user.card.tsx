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
    <div className="max-w-3xl w-full bg-white shadow-lg rounded-2xl p-8 border border-gray-200 mx-auto">
      <h2 className="text-3xl font-semibold text-purple text-center mb-8">
        {t("title")}
      </h2>

      <div className="space-y-6">
        {/* Name */}
        <div className="flex items-start gap-6">
          <UserIcon className="text-purple text-3xl mt-1" />
          <div>
            <p className="text-base text-gray-500 uppercase tracking-wide">{t("name")}</p>
            <p className="text-xl font-medium text-gray-800">{name}</p>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start gap-6">
          <EmailIcon className="text-purple text-3xl mt-1" />
          <div>
            <p className="text-base text-gray-500 uppercase tracking-wide">{t("email")}</p>
            <p className="text-xl font-medium text-gray-800">{email}</p>
          </div>
        </div>

        {/* Role */}
        <div className="flex items-start gap-6">
          <RoleIcon className="text-purple text-3xl mt-1" />
          <div>
            <p className="text-base text-gray-500 uppercase tracking-wide">{t("role")}</p>
            <p
              className={`text-xl font-medium ${
                role === "admin" ? "text-red-500" : "text-gray-800"
              }`}
            >
              {translatedRole}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
