/* eslint-disable @next/next/no-sync-scripts */

import { JSX } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import "~/styles/globals.css";
import { routing } from "~/i18n/routing";
import { Locale } from "~/i18n/routing";
import NavBar from "~/app/components/navbar";

import { cookies } from "next/headers";

interface LocaleProps {
  children: React.ReactNode;
  params: { locale: string };
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
  const isAuthenticated = !!token;

  return (
    <html lang={locale}>
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.css"
          rel="stylesheet"
        />
      </head>
      <body className="mx-8">
        <NextIntlClientProvider messages={messages}>
          <NavBar isAuthenticated={isAuthenticated} />
          {children}
        </NextIntlClientProvider>
        <script src="https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.js"></script>
      </body>
    </html>
  );
}
