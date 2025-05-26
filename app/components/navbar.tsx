"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Link } from "~/i18n/routing";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Button from "./buttons/button";
import ROUTES from "~/constants/urls/urls";
import { logout } from "@/shared/utils/auth.util";
import LogoutIcon from "./icons/logout.icon";
 
interface NavBarProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  locale: string;
  id: string;
}
 
export default function NavBar({
  isAuthenticated,
  isAdmin,
  locale,
  id,
}: NavBarProps) {
  const t = useTranslations("NavBar");
  const [isMenuOpen, setIsMenuOpen] = useState(false);  const router = useRouter();
  const pathname = usePathname();
 
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);
 
  useEffect(() => {
    const message = sessionStorage.getItem("notification");
    const type = sessionStorage.getItem("notificationType");
 
    if (message) {
      if (type === "error") {
        toast.error(message);
      } else if (type === "warning") {
        toast.warning(message);
      } else if (type === "info") {
        toast.info(message);
      } else if (type === "success") {
        toast.success(message);
      } else {
        toast(message);
      }
      sessionStorage.removeItem("notification");
      sessionStorage.removeItem("notificationType");
    }
  }, []);
 
  return (
    <nav className="bg-white border-gray-200 mb-10 fixed w-full z-50 top-0 left-0 shadow-sm">
      <div className="flex flex-wrap items-center p-4 justify-around">
        <Image
          src="/logos/combination-mark.png"
          alt="TikTrack Logo"
          width={947}
          height={222}
          className="w-60 h-auto"
          priority={true}
        />
        <div className="flex 2xl:order-2 space-x-3 2xl:space-x-0 rtl:space-x-reverse items-center flex-wrap justify-center">
          {isAuthenticated ? (
            <div className="flex items-center gap-4 bg-gray-100 p-2 rounded-md">
              <Link
                href={{
                  pathname: `${ROUTES.PROFILE}`,
                  params: { id: id },
                }}
                className="px-4 py-2 rounded-md font-semibold transition-all bg-purple text-white cursor-pointer hover:bg-darkPurple"
              >
                {t("profile")}
              </Link>
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
            onClick={() => setIsMenuOpen(prev => !prev)}
            data-collapse-toggle="navbar-cta"
            type="button"
            className="my-5 sm:my-0 inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg 2xl:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-cta"
            aria-expanded={isMenuOpen}
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
          className={`items-center justify-between w-full 2xl:flex 2xl:w-auto 2xl:order-1 ${isMenuOpen ? '' : 'hidden'}`}
          id="navbar-cta"
        >
          <ul className="flex flex-col font-medium p-4 2xl:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 2xl:space-x-8 rtl:space-x-reverse 2xl:flex-row 2xl:mt-0 2xl:border-0 2xl:bg-white">
            <li>
              <Link
                className="px-4 py-2 text-lg font-medium text-black hover:text-purple transition-colors duration-200"
                href={ROUTES.HOME}
              >
                {t("home")}
              </Link>
            </li>
            <li>
              <Link
                className="px-4 py-2 text-lg font-medium text-black hover:text-purple transition-colors duration-200"
                href={ROUTES.INFLUENCERS}
              >
                {t("influencers")}
              </Link>
            </li>
            {isAdmin && (
              <>
                <li>
                  <Link
                    className="px-4 py-2 text-lg font-medium text-black hover:text-purple transition-colors duration-200"
                    href={ROUTES.INFLUENCERS_DISABLED}
                  >
                    {t("influencersDisabled")}
                  </Link>
                </li>
                <li>
                  <Link
                    className="px-4 py-2 text-lg font-medium text-black hover:text-purple transition-colors duration-200"
                    href={ROUTES.INFLUENCERS_REPORTED}
                  >
                    {t("influencersReported")}
                  </Link>
                </li>
                <li>
                  <Link
                    className="px-4 py-2 text-lg font-medium text-black hover:text-purple transition-colors duration-200"
                    href={ROUTES.USER_MANAGEMENT_INDEX}
                  >
                    {t("userManagement")}
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}