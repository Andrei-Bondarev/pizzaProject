import React, { FC } from "react";
import ReactPaginate from "react-paginate";
import styles from "./pagination.module.scss";
type PaginationProps = {
  setCurrentPage: (page: number) => void;
};
const Pagination: FC<PaginationProps> = ({ setCurrentPage }) => {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      className={styles.root}
      onPageChange={(event) => setCurrentPage(event.selected + 1)}
      pageRangeDisplayed={5}
      pageCount={3}
      previousLabel="<"
    />
  );
};

export default Pagination;
