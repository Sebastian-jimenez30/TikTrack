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
    "/messages/[username]": {
      en: "/messages/[username]",
      es: "/mensajes/[username]",
    },
    "/admin/influencers/disabled": {
      en: "/admin/influencers/disabled",
      es: "/admin/creadores-de-contenido/desactivados",
    },
    "/not-found": {
      en: "/not-found",
      es: "/no-encontrado",
    },
    "/sign-in": {
      en: "/sign-in",
      es: "/iniciar-sesion",
    },
    "/sign-up": {
      en: "/sign-up",
      es: "/registrarse",
    },
    "/profile": {
      en: "/profile",
      es: "/perfil",
    },
    "/admin/users-management": {
      en: "/admin/users-management",
      es: "/admin/gestion-de-usuarios",
    },

    "/admin/user/manage": {
      en: "/admin/user/manage",
      es: "/admin/usuario/gestionar",
    },
  },
});
export type Locale = (typeof routing.locales)[number];

type StaticPathname = Exclude<
  keyof typeof routing.pathnames,
  "/influencers/[username]" | "/messages/[username]"
>;

export type Pathname = StaticPathname;

export type Href = {
  pathname: StaticPathname;
  query?: Record<string, any>;
};

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
