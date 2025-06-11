import { useContext } from "react";
import { recordsPerPage } from "../../data/perPage";
import { FilterBarContext } from "../../context/FilterBarContext";

const PerPage = () => {
  const filterContext = useContext(FilterBarContext);
  if (!filterContext) {
    throw new Error(
      "useFilterBarContext must be used within FilterBarProvider"
    );
  }
  const { perPage, setPerPage } = filterContext;

  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex items-center gap-1 w-fit border-2 border-[var(--color-bg-primary)] bg-[var(--color-bg-secondary)] rounded-lg py-0.5 px-1.5">
        <p className="text-[var(--color-text-primary)] font-semibold">
          Coins Per Page
        </p>
        <select
          onChange={(e) => {
            setPerPage(+e.target.value);
          }}
          value={perPage}
          className="bg-[var(--color-bg-primary)] py-1 px-2 rounded-lg cursor-pointer hover:opacity-60 transition-opacity duration-300 outline-none text-[var(--color-text-primary)] font-semibold"
        >
          {recordsPerPage.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default PerPage;
