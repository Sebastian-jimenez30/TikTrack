"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import UserIcon from "~/app/components/icons/user.icon";
import EmailIcon from "~/app/components/icons/email.icon";
import RoleIcon from "~/app/components/icons/role.icon";
import LockIcon from "~/app/components/icons/lock.icon";
import axios from "axios";
import ROUTES_API from "~/constants/urls/api.urls";
interface UpdateUserCardProps {
  initialData: {
    username: string;
    name: string;
    email: string;
    role: "admin" | "user";
    status: "active" | "inactive";
  };
  userId: number;
}

export default function UpdateUserCard({
  initialData,
  userId,
}: UpdateUserCardProps) {
  const t = useTranslations("UserManagementPage");

  const [formData, setFormData] = useState({
    username: initialData.username,
    name: initialData.name,
    email: initialData.email,
    password: "",
    role: initialData.role,
    status: initialData.status,
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (
      !formData.name ||
      !formData.email ||
      !formData.role ||
      !formData.status
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      const response = await axios.patch(`${ROUTES_API.USER_UPDATE}`, {
        userId,
        username: formData.username,
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        status: formData.status,
      });

      const pageData = response.data.pageData;

      if (!pageData.is_success) {
        setError(pageData.message || "Error updating user");
      } else {
        window.location.href = "/admin/usuarios";
      }
    } catch {
      setError("Error updating user. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl w-full bg-white shadow-lg rounded-2xl p-8 border border-gray-200 mx-auto space-y-6"
    >
      <h2 className="text-3xl font-semibold text-purple text-center mb-4">
        {t("editTitle")}
      </h2>

      {error && (
        <div className="p-4 mb-4 text-red-600 bg-red-100 border border-red-400 rounded">
          {error}
        </div>
      )}

      <div className="flex items-start gap-6">
        <UserIcon className="text-purple text-3xl mt-1" />
        <div className="w-full">
          <label className="text-base text-gray-500 uppercase tracking-wide">
            {t("name")}
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
          />
        </div>
      </div>

      <div className="flex items-start gap-6">
        <EmailIcon className="text-purple text-3xl mt-1" />
        <div className="w-full">
          <label className="text-base text-gray-500 uppercase tracking-wide">
            {t("email")}
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
          />
        </div>
      </div>

      <div className="flex items-start gap-6">
        <LockIcon className="text-purple text-3xl mt-1" />
        <div className="w-full">
          <label className="text-base text-gray-500 uppercase tracking-wide">
            {t("password")}
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
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
            value={formData.role}
            onChange={handleChange}
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
            value={formData.status}
            onChange={handleChange}
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
          >
            <option value="active">{t("active")}</option>
            <option value="inactive">{t("inactive")}</option>
          </select>
        </div>
      </div>

      <div className="text-center mt-6">
        <button
          type="submit"
          className="bg-purple text-white py-3 px-8 rounded-lg font-semibold hover:bg-darkPurple transition-all"
        >
          {t("save")}
        </button>
      </div>
    </form>
  );
}
