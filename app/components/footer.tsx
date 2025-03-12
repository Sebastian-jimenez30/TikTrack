"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Footer() {
  const t = useTranslations("Footer");
  return (
    <footer className="bg-lightPurple p-4 shadow mt-20">
      <div className="mx-auto w-full max-w-screen-xl p-4 md:py-8">
        <div className="flex items-center justify-center">
          <Image
            src="/logos/combination-mark.png"
            alt="TikTrack Logo"
            width={500}
            height={500}
            priority={true}
          />
        </div>
        <hr className="mx-auto my-6 border-offWhite" />
        <span className="block text-center text-sm font-bold text-offWhite">
          {t("footerText")}
        </span>
      </div>
    </footer>
  );
}
