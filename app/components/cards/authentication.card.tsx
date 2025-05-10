"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "~/i18n/routing";

interface AuthCardProps {
  type: "sign-in" | "sign-up";
  onSubmit: (formData: FormData) => Promise<{ error?: string }>;
}

export default function AuthCard({ type, onSubmit }: AuthCardProps) {
  const t1 = useTranslations("SignInPage");
  const t2 = useTranslations("SignUpPage");

  const [error, setError] = useState<string | null>(null);

  async function handleFormSubmit(formData: FormData) {
    const result = await onSubmit(formData);
    if (result.error) {
      setError(result.error);
    }
  }

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6 text-purple">
        {type === "sign-in" ? t1("title") : t2("title")}
      </h1>

      {error && (
        <div className="mb-4 p-2 text-red-600 bg-red-100 border border-red-400 rounded">
          {error}
        </div>
      )}

      <form action={handleFormSubmit} className="space-y-4">
        {type === "sign-up" && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t2("nameLabel")}
            </label>
            <input
              type="text"
              name="username"
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {type === "sign-in" ? t1("emailLabel") : t2("emailLabel")}
          </label>
          <input
            type="email"
            name="email"
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {type === "sign-in" ? t1("passwordLabel") : t2("passwordLabel")}
          </label>
          <input
            type="password"
            name="password"
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-purple text-white py-2 rounded hover:bg-darkPurple transition-colors"
          >
            {type === "sign-in" ? t1("submit") : t2("submit")}
          </button>
        </div>

        <div className="text-center">
          <span className="text-sm text-gray-600">
            {type === "sign-in" ? t1("noAccount") : t2("alreadyHaveAccount")}
            <br />
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="text-purple hover:underline"
            >
              {type === "sign-in" ? t1("register") : t2("signIn")}
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
}
