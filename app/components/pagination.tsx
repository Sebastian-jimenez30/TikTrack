"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

interface PaginationProps {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalElements: number;
  start: number;
  end: number;
}

export default function Pagination({
  hasNextPage,
  hasPreviousPage,
  totalElements,
  start,
  end,
}: PaginationProps) {
  const t = useTranslations("Pagination");

  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") ?? 1);

  const updatePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-col items-center my-5">
      <span className="text-sm text-gray-700">
        {t("showing")}{" "}
        <span className="font-semibold text-gray-900">{start}</span> {t("to")}{" "}
        <span className="font-semibold text-gray-900 ">{end}</span> {t("of")}{" "}
        <span className="font-semibold text-gray-900">{totalElements}</span>{" "}
        {t("entries")}
      </span>
      <div className="inline-flex mt-2 xs:mt-0">
        <button
          className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-purple rounded-s disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => updatePage(page - 1)}
          disabled={!hasPreviousPage}
        >
          <svg
            className="w-3.5 h-3.5 me-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 5H1m0 0 4 4M1 5l4-4"
            />
          </svg>
          {t("previous")}
        </button>
        <button
          className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-purple border-0 border-s border-black rounded-e disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => updatePage(page + 1)}
          disabled={!hasNextPage}
        >
          {t("next")}
          <svg
            className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
