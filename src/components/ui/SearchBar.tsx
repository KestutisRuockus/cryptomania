import { useContext, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { FilterBarContext } from "../../context/FilterBarContext";

const SearchBar = () => {
  const [inputValue, setInputValue] = useState<string>("");

  const filterCOntext = useContext(FilterBarContext);
  if (!filterCOntext) {
    throw new Error(
      "useFilterBarContext must be used within FilterBarProvider"
    );
  }
  const { searchQuery, setSearchQuery, setPage } = filterCOntext;

  const handleInputSubmit = () => {
    if (inputValue.trim()) {
      setPage(1);
      setSearchQuery(inputValue);
      setInputValue("");
    }
  };

  const clearSearchQuery = () => {
    setSearchQuery("");
  };

  return (
    <div className="w-full flex flex-col items-start gap-2">
      <div className="flex items-center relative">
        <input
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleInputSubmit();
            }
          }}
          value={inputValue}
          placeholder="Search here..."
          className="w-full min-w-3xs border-2 border-[var(--color-bg-primary)] py-1 pl-2 pr-7 rounded-lg outline-none text-[var(--color-text-primary)]"
        />
        <IoMdSearch
          onClick={handleInputSubmit}
          className="absolute right-1 text-2xl cursor-pointer hover:opacity-70 transition-opacity duration-200"
        />
      </div>
      {searchQuery && (
        <button
          onClick={clearSearchQuery}
          className="py-1 px-3 bg-[var(--color-bg-primary)] rounded-lg text-[var(--color-text-primary)] font-semibold cursor-pointer hover:opacity-70 transition-opacity duration-300"
        >
          Clear Search Filter
        </button>
      )}
    </div>
  );
};

export default SearchBar;
