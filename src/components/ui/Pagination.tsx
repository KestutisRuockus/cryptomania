import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from "react-icons/fa";

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
    <div className="w-full flex flex-col sm:flex-row sm:justify-between items-end my-4">
      <p className="text-[var(--color-text-primary)]">
        Data Provided By{" "}
        <a
          href="https://www.coingecko.com/"
          target="_blank"
          style={{ fontSize: "var(--text-body-lg)" }}
          className="text-[var(--color-text-secondary)] font-semibold"
        >
          CoinGecko
        </a>
      </p>
      <div
        style={{ fontSize: "var(--text-body-lg)" }}
        className="flex gap-2 items-center"
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
