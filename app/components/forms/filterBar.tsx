"use client";

import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface FilterOption {
  value: string;
}

interface FilterDefinition {
  name: string;
  type: "select";
  options: FilterOption[];
}

interface FilterBarProps {
  filters: FilterDefinition[];
  translation: string;
}

export default function FilterBar({ filters, translation }: FilterBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const t = useTranslations(translation);

  const handleChange = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-4 justify-between items-center mb-4">
      {filters.map((filter) => (
        <div key={filter.name} className="flex flex-col min-w-[150px]">
          <label
            htmlFor={filter.name}
            className="mb-1 text-sm font-medium text-gray-700"
          >
            {t(filter.name)}
          </label>
          <select
            id={filter.name}
            name={filter.name}
            onChange={(e) => handleChange(filter.name, e.target.value)}
            defaultValue={searchParams.get(filter.name) || ""}
            className="border border-gray-300 rounded px-3 py-2 text-sm"
          >
            <option value=""></option>

            {filter.name === "updatedAt" ? (
              <>
                <option value={filter.options[0]?.value}>{t("today")}</option>
                <option value={filter.options[1]?.value}>
                  {t("thisWeek")}
                </option>
                <option value={filter.options[2]?.value}>
                  {t("thisMonth")}
                </option>
              </>
            ) : filter.name === "role" ? (
              <>
                <option value={filter.options[0]?.value}>{t("admin")}</option>
                <option value={filter.options[1]?.value}>{t("user")}</option>
              </>
            ) : filter.name === "status" ? (
              <>
                <option value={filter.options[0]?.value}>{t("active")}</option>
                <option value={filter.options[1]?.value}>
                  {t("inactive")}
                </option>
              </>
            ) : (
              filter.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.value}
                </option>
              ))
            )}
          </select>
        </div>
      ))}
    </div>
  );
}
