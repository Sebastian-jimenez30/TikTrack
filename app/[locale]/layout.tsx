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
import NavBar from "~/app/components/shared/navbar.shared";
import Footer from "~/app/components/shared/footer.shared";
import jwtUtil from "@/shared/utils/jwt.util";
import { cookies } from "next/headers";
import { Toaster } from "sonner";

interface LocaleProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
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

  let isAuthenticated = false;
  let isAdmin = false;
  let userId = "";

  if (token && !(await jwtUtil.isTokenExpired(token))) {
    isAuthenticated = true;
    isAdmin = await jwtUtil.isAdmin(token);
    const userTempId = await jwtUtil.getUserIdFromToken(token);
    userId = userTempId.toString() || "";
  }

  return (
    <html lang={locale}>
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.css"
          rel="stylesheet"
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <NavBar
            isAuthenticated={isAuthenticated}
            isAdmin={isAdmin}
            locale={locale}
            id={userId}
          />
          <Toaster richColors position="top-right" />
          <div>
            <div className="sm:px-20 sm:pt-[130px] pt-[200px] px-10">
              {children}
            </div>
          </div>
          <Footer />
        </NextIntlClientProvider>
        <script src="https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.js"></script>
      </body>
    </html>
  );
}
