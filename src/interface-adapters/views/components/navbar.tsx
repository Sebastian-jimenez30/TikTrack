import { useTranslations } from "next-intl";
import { Link } from "~/i18n/routing";
import Image from "next/image";
import Button from "./button";
import ROUTES from "~/constants/urls";

export default function NavBar() {
  const t = useTranslations("NavBar");

  const navbarPages = ["HOME"];
  const navbarLinks = [];

  navbarPages.forEach((pageKey) => {
    navbarLinks.push({
      label: t(pageKey.toLowerCase()),
      path: ROUTES[pageKey],
    });
  });

  return (
    <nav className="bg-white border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Image
          src="/logos/combination-mark.png"
          alt="TikTrack Logo"
          width={947}
          height={222}
          className="w-60 h-auto"
          priority
        />
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <Button variant="primary">Get started</Button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-cta"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
            {navbarLinks.map(({ label, path }, index) => (
              <li key={index}>
                <Link href={path}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
