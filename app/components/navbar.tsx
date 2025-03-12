"use client";

import { useTranslations } from "next-intl";
import { Link } from "~/i18n/routing";
import Image from "next/image";
import Button from "./button";
import ROUTES from "~/constants/urls";
import { logout } from "@/shared/utils/auth.utils"; 
import  LogoutIcon  from "./icons/logout.icon";

interface NavBarProps {
  isAuthenticated: boolean;
  locale: string; 
}

export default function NavBar({ isAuthenticated, locale }: NavBarProps) {
  const t = useTranslations("NavBar");

  return (
    <nav className="bg-white border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center sm:justify-between mx-auto p-4 justify-center">
        <Image
          src="/logos/combination-mark.png"
          alt="TikTrack Logo"
          width={947}
          height={222}
          className="w-60 h-auto"
          priority={true}
        />
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {isAuthenticated ? (
            <form action={() => logout(locale)}>
            <button
              type="submit"
              className="w-full flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <LogoutIcon className="text-xl" />
              {t("logout")}
            </button>
          </form>
          ) : (
            <Button href={ROUTES.SIGN_IN} variant="primary">
              {t("getStarted")}
            </Button>
          )}
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