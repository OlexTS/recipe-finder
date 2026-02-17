import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  totalResults: number;
  setPage: (page: number) => void;
  page: number;
  pageSize: number;
}

const Pagination = ({
  totalResults,
  setPage,
  page,
  pageSize,
}: PaginationProps) => {
  const pageCount = Math.ceil(totalResults / pageSize);
  return (
    <ReactPaginate
      pageCount={pageCount}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => setPage(selected + 1)}
      forcePage={page - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
};

export default Pagination;
