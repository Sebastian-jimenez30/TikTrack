/* eslint-disable @next/next/no-sync-scripts */

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "~/i18n/routing";
import { Locale } from "~/i18n/routing";
import NavBar from "~/app/components/navbar";
import "~/styles/globals.css";
interface LocaleProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default async function LocaleLayout({ children, params }: LocaleProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.css"
          rel="stylesheet"
        />
      </head>
      <body className="mx-5">
        <NextIntlClientProvider messages={messages}>
          <NavBar />
          {children}
        </NextIntlClientProvider>
        <script src="https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.js"></script>
      </body>
    </html>
  );
}
