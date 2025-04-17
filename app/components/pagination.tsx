import { useTranslations } from "next-intl";
import { JSX } from "react";
import { Pathname } from "~/i18n/routing";
import { Link } from "~/i18n/routing";

interface PaginationProps {
  pathname: Pathname;
  page: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalElements: number;
  start: number;
  end: number;
}

export default function Pagination({
  pathname,
  page,
  hasNextPage,
  hasPreviousPage,
  totalElements,
  start,
  end,
}: PaginationProps): JSX.Element {
  const t = useTranslations("Pagination");

  const baseClasses =
    "flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-purple";

  const disabledClasses = "opacity-50 cursor-not-allowed";

  start = totalElements === 0 ? 0 : start;

  return (
    <div className="flex flex-col items-center my-5">
      <span className="text-sm text-gray-700">
        {t("showing")}{" "}
        <span className="font-semibold text-gray-900">{start}</span> {t("to")}{" "}
        <span className="font-semibold text-gray-900">{end}</span> {t("of")}{" "}
        <span className="font-semibold text-gray-900">{totalElements}</span>{" "}
        {t("entries")}
      </span>

      <div className="inline-flex mt-2 xs:mt-0">
        {hasPreviousPage ? (
          <Link
            href={{ pathname: pathname, query: { page: page - 1 } }}
            scroll={false}
            className={`${baseClasses} rounded-s`}
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
          </Link>
        ) : (
          <span
            className={`${baseClasses} rounded-s ${disabledClasses}`}
            aria-disabled="true"
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
          </span>
        )}

        {hasNextPage ? (
          <Link
            href={{ pathname: pathname, query: { page: page + 1 } }}
            scroll={false}
            className={`${baseClasses} border-0 border-s border-black rounded-e`}
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
          </Link>
        ) : (
          <span
            className={`${baseClasses} border-0 border-s border-black rounded-e ${disabledClasses}`}
            aria-disabled="true"
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
          </span>
        )}
      </div>
    </div>
  );
}
