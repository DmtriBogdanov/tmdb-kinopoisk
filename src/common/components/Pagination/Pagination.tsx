import { getPaginationPages } from "@/common/utils";
import s from "./Pagination.module.css";

type Props = {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  pagesCount: number;
};

export const Pagination = ({
                             currentPage,
                             setCurrentPage,
                             pagesCount,
                           }: Props) => {
  if (pagesCount <= 1) return null;

  const pages = getPaginationPages(
    currentPage,
    pagesCount
  );

  return (
    <div className={s.pagination}>
      {pages.map((page, index) =>
        page === "..." ? (
          <span
            key={`ellipsis-${index}`}
            className={s.ellipsis}
          >
            ...
          </span>
        ) : (
          <button
            key={page}
            type="button"
            className={
              page === currentPage
                ? `${s.pageButton} ${s.pageButtonActive}`
                : s.pageButton
            }
            onClick={() =>
              page !== currentPage &&
              setCurrentPage(page)
            }
            disabled={page === currentPage}
          >
            {page}
          </button>
        )
      )}
    </div>
  );
};