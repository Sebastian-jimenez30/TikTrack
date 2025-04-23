import React from "react";


interface SearchBarProps {
  actionUrl: string; // The URL to which the search query will be submitted
  searchParamName?: string; // The name of the query parameter (default: "search")
}

const SearchBar: React.FC<SearchBarProps> = ({
  actionUrl,
  searchParamName = "search",
}) => {
  return (
    <form
      action={actionUrl}
      method="get"
      className="flex items-center space-x-2"
    >
      <input
        type="text"
        name={searchParamName}
        placeholder="Search influencers..."
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-purple border border-purple-300 bg bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;