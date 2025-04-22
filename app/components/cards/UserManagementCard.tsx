"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<null | UserManagementCardProps["users"][number]>(null);

  const handleUserClick = (user: UserManagementCardProps["users"][number]) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="max-w-6xl w-full bg-white shadow-lg rounded-2xl p-10 border border-gray-200 mx-auto">
      <h2 className="text-4xl font-semibold text-purple text-center mb-10">
        {t("userManagement")}
      </h2>

      <div className="space-y-8">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center gap-8 border-b border-gray-200 py-6 px-4 bg-gray-50 rounded-lg cursor-pointer"
            onClick={() => handleUserClick(user)} // Al hacer clic, abrimos el modal
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
          </div>
        ))}
      </div>

      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-xl w-1/3">
            <h3 className="text-2xl font-semibold text-purple text-center mb-4">
              {t("editUser")}
            </h3>
            <form>
              <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700">
                  {t("name")}
                </label>
                <input
                  type="text"
                  id="username"
                  defaultValue={selectedUser.name}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700">
                  {t("email")}
                </label>
                <input
                  type="email"
                  id="email"
                  defaultValue={selectedUser.email}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700">
                  {t("password")}
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600"
                  onClick={() => {} }
                >
                  {t("update")}
                </button>
                <button
                  type="button"
                  className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600"
                  onClick={() => {} }
                >
                  {t("deactivate")}
                </button>
              </div>
              <button
                type="button"
                className="mt-4 w-full text-center bg-gray-200 p-3 rounded-lg"
                onClick={closeModal}
              >
                {t("close")}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
