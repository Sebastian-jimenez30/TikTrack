/* eslint-disable @next/next/no-sync-scripts */

import { JSX } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import "~/styles/globals.css";
import { routing } from "~/i18n/routing";
import { Locale } from "~/i18n/routing";
import NavBar from "~/app/components/navbar";
import Footer from "~/app/components/footer";
import jwtUtil from "@/shared/utils/jwt.util";
import { cookies } from "next/headers";

interface LocaleProps {
  children: React.ReactNode;
  params: { locale: string };
}

export async function generateMetadata() {
  const t = await getTranslations("LayoutPage");

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
  };
}


export default async function LocaleLayout({
  children,
  params,
}: LocaleProps): Promise<JSX.Element> {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  const token = (await cookies()).get("authToken")?.value;

  let isAuthenticated = false
  let isAdmin = false;

  if(token && !await jwtUtil.isTokenExpired(token)) {
    isAuthenticated = true
    isAdmin = await jwtUtil.isAdmin(token);
  }


  return (
    <html lang={locale}>
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.css"
          rel="stylesheet"
        />
      </head>
      <body className="">
        <NextIntlClientProvider messages={messages}>
          <NavBar isAuthenticated={isAuthenticated} isAdmin={isAdmin} locale={locale} />
          {children}
          <Footer />
        </NextIntlClientProvider>
        <script src="https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.js"></script>
      </body>
    </html>
  );
}
