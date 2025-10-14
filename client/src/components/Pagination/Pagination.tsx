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
    let prevAdded = false;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(i);
        prevAdded = true;
      } else {
        if (prevAdded) {
          pages.push("...");
          prevAdded = false;
        }
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className={styles.pagination}>
      <button
        className={`${styles.navButton} ${
          currentPage === 1 ? styles.disabled : ""
        }`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <FaArrowLeft /> Previous
      </button>

      <div className={styles.pages}>
        {pageNumbers.map((num, index) =>
          num === "..." ? (
            <span key={index} className={styles.dots}>
              ...
            </span>
          ) : (
            <button
              key={num}
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
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next <FaArrowRight />
      </button>
    </div>
  );
}
