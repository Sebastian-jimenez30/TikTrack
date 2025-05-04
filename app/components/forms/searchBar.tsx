import { getTranslations } from "next-intl/server";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
}

export default async function SearchBar({
  placeholder = "",
  className = "",
}: SearchBarProps) {
  const t = await getTranslations("SearchBar");
  return (
    <form action="" method="GET" className={`${className}`}>
      <label
        htmlFor="search-input"
        className="text-sm font-medium text-gray-900 sr-only"
      >
        {t("search")}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          name="search"
          id="search-input"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 "
          placeholder={placeholder}
          required
        />
        <button
          type="submit"
          className="text-white absolute end-2.5 bottom-2.5 bg-lightPurple hover:bg-purple focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2"
        >
          {t("search")}
        </button>
      </div>
    </form>
  );
}
