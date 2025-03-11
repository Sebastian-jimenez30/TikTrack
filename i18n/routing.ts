import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

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
    "/messages": {
      en: "/messages",
      es: "/mensajes",
    },
  },
});

export type Locale = (typeof routing.locales)[number];

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
