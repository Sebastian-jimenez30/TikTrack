import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";
import { UrlObject } from "url";

export const routing = defineRouting({
  locales: ["en", "es"],
  defaultLocale: "en",

  pathnames: {
    "/": {
      en: "/",
      es: "/",
    },
    "/influencers": {
      en: "/influencers",
      es: "/creadores-de-contenido",
    },
    "/influencers/[username]": {
      en: "/influencers/[username]",
      es: "/creador-de-contenido/[username]",
    },

    "/sign-in": { en: "/sign-in", es: "/iniciar-sesion" },
    "/sign-up": { en: "/sign-up", es: "/registrarse" },
  },
});

export type Locale = (typeof routing.locales)[number];

type StaticPathname = Exclude<
  keyof typeof routing.pathnames,
  "/influencers/[username]"
>;

export type Pathname =
  | StaticPathname
  | ({ pathname: StaticPathname } & Omit<UrlObject, "pathname">);

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
