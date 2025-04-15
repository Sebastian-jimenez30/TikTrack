"use client";

import { useTranslations } from "next-intl";
import { Link } from "~/i18n/routing";
import Image from "next/image";
import Button from "./buttons/button";
import ROUTES from "~/constants/urls/urls";
import { logout } from "@/shared/utils/auth.util";
import LogoutIcon from "./icons/logout.icon";

interface NavBarProps {
  isAuthenticated: boolean;
  locale: string;
}

export default function NavBar({ isAuthenticated, locale }: NavBarProps) {
  const t = useTranslations("NavBar");

  return (
    <nav className="bg-white border-gray-200 mb-10">
      <div className="max-w-screen-xl flex flex-wrap items-center sm:justify-between mx-auto p-4 justify-center">
        <Image
          src="/logos/combination-mark.png"
          alt="TikTrack Logo"
          width={947}
          height={222}
          className="w-60 h-auto"
          priority={true}
        />
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse items-center">
          {isAuthenticated ? (
            <div className="flex items-center gap-4 bg-gray-100 p-2 rounded-md">
              <Button href={ROUTES.PROFILE} variant="primary">
                {t("profile")}
              </Button>
              <div className="border-l border-gray-300 h-6"></div>
              <form action={() => logout(locale)}>
                <button
                  type="submit"
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors px-3 py-2 rounded-md hover:bg-gray-200"
                >
                  <LogoutIcon className="text-xl" />
                  {t("logout")}
                </button>
              </form>
            </div>
          ) : (
            <Button href={ROUTES.SIGN_IN} variant="primary">
              {t("getStarted")}
            </Button>
          )}
          <button
            data-collapse-toggle="navbar-cta"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-cta"
            aria-expanded="false"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-cta"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
            <li>
              <Link href={ROUTES.HOME}> {t("home")} </Link>
            </li>
            <li>
              <Link href={ROUTES.INFLUENCERS}> {t("influencers")} </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
