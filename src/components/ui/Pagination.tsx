import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from "react-icons/fa";
import PerPage from "./PerPage";

const PagesNumbersRow = ({
  page,
  hasMore,
}: {
  page: number;
  hasMore: boolean;
}) => {
  return (
    <div className=" flex gap-1">
      {page > 1 && (
        <span className="cursor-pointer hover:text-[var(--color-text-hover)] text-[var(--color-text-primary)]">
          <span>{page - 1}</span>
        </span>
      )}
      <span className="text-[var(--color-text-secondary)] font-bold">
        {page}
      </span>
      {hasMore && (
        <span className="cursor-pointer hover:text-[var(--color-text-hover)] text-[var(--color-text-primary)]">
          <span>{page + 1}</span>
        </span>
      )}
    </div>
  );
};

const Pagination = ({
  page,
  setPage,
  hasMore,
}: {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  hasMore: boolean;
}) => {
  const loadPreviousPage = () => {
    if (page === 1) {
      return;
    } else {
      setPage((prev) => prev - 1);
    }
  };

  const loadNextPage = () => {
    if (!hasMore) {
      return;
    } else {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="flex gap-6">
      <PerPage />
      <div
        style={{ fontSize: "var(--text-body-lg)" }}
        className="flex gap-2 items-center border-2 border-[var(--color-bg-primary)] bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] rounded-lg py-0.5 px-1.5"
      >
        <FaRegArrowAltCircleLeft
          onClick={loadPreviousPage}
          className="text-[var(--color-text-primary)] hover:text-[var(--color-text-hover)] transition-colors duration-300 ease-in cursor-pointer"
        />
        <PagesNumbersRow page={page} hasMore={hasMore} />
        <FaRegArrowAltCircleRight
          onClick={loadNextPage}
          className="text-[var(--color-text-primary)] hover:text-[var(--color-text-hover)] transition-colors duration-300 ease-in cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Pagination;
