import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import styles from "./Pagination.module.scss";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    pages.push(1);

    const left = Math.max(2, currentPage - 1);
    const right = Math.min(totalPages - 1, currentPage + 1);

    if (left > 2) pages.push("...");

    for (let i = left; i <= right; i++) {
      pages.push(i);
    }

    if (right < totalPages - 1) pages.push("...");

    pages.push(totalPages);

    const unique: (number | string)[] = [];
    pages.forEach((p) => {
      if (unique.length === 0 || unique[unique.length - 1] !== p)
        unique.push(p);
    });

    return unique;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className={styles.pagination}>
      <button
        className={`${styles.navButton} ${
          currentPage === 1 ? styles.disabled : ""
        }`}
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        <FaArrowLeft /> Previous
      </button>

      <div className={styles.pages}>
        {pageNumbers.map((num, index) =>
          num === "..." ? (
            <span key={`dots-${index}`} className={styles.dots}>
              ...
            </span>
          ) : (
            <button
              key={`page-${num}`}
              onClick={() => onPageChange(Number(num))}
              className={`${styles.pageButton} ${
                currentPage === num ? styles.active : ""
              }`}
            >
              {num}
            </button>
          )
        )}
      </div>

      <button
        className={`${styles.navButton} ${
          currentPage === totalPages ? styles.disabled : ""
        }`}
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        Next <FaArrowRight />
      </button>
    </div>
  );
}
