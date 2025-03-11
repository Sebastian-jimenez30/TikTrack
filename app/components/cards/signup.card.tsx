"use client"; 

import { useTranslations } from "next-intl";
import { Link } from "~/i18n/routing"; 

interface SignUpCardProps {
  username: string;
  email: string;
  password: string;
  error: string | null;
  loading: boolean;
  onUsernameChange: (username: string) => void;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function SignUpCard({
  username,
  email,
  password,
  error,
  loading,
  onUsernameChange,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}: SignUpCardProps) {
  const t = useTranslations("Auth"); 
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-purple">
          {t("signUp.title")} 
        </h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t("signUp.usernameLabel")} 
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => onUsernameChange(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t("signUp.emailLabel")} 
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t("signUp.passwordLabel")} 
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => onPasswordChange(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div>
            <button
              type="submit"
              className="w-full bg-purple text-white py-2 rounded hover:bg-darkPurple transition-colors"
              disabled={loading}
            >
              {loading ? t("loading") : t("signUp.submit")}
            </button>
          </div>

          <div className="text-center">
            <span className="text-sm text-gray-600">
              {t("signUp.alreadyAccount")}{" "} 
              <Link
                href="/sign-in" 
                className="text-purple hover:underline"
              >
                {t("signUp.login")} 
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}