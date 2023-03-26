import React from "react";

function Pagination({ response }) {
  const { success, page, limit, total } = response;

  // Calculate the number of pages
  const numPages = Math.ceil(total / limit);

  // Determine if the previous and next buttons should be disabled
  const prevDisabled = page === 1;
  const nextDisabled = page === numPages;

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-end">
        <li className={`page-item ${prevDisabled ? "disabled" : ""}`}>
          <a className="page-link" href={`/?page=${page - 1}`}>
            <i data-feather="chevron-left"></i>
          </a>
        </li>
        {[...Array(numPages)].map((_, index) => (
          <li
            key={index}
            className={`page-item ${page === index + 1 ? "active" : ""}`}
          >
            <a className="page-link" href={`/?page=${index + 1}`}>
              {index + 1}
            </a>
          </li>
        ))}
        <li className={`page-item ${nextDisabled ? "disabled" : ""}`}>
          <a className="page-link" href={`/?page=${page + 1}`}>
            <i data-feather="chevron-right"></i>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
