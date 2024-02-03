import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Pagination( { page, total, limit, setPage }) {
  // const { success, page, limit, total } = response;
  

  // Calculate the number of pages
  const numPages = Math.ceil(total / limit);

  // Determine if the previous and next buttons should be disabled
  const prevDisabled = page === 1;
  const nextDisabled = page === numPages;

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-end">
        <li className={`page-item ${prevDisabled ? "disabled" : ""}`}>
          <Link className="page-link" 
          
          
          onClick = {()=>setPage(page - 1)}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </Link>
        </li>
        {[...Array(numPages)].map((_, index) => (
          <li
            key={index}
            className={`page-item ${page === index + 1 ? "active" : ""}`}
          >
            <Link className="page-link"
            onClick = {()=>setPage(index + 1)}
             >
              {index + 1}
            </Link>
          </li>
        ))}
        <li className={`page-item ${nextDisabled ? "disabled" : ""}`}>
          <Link className="page-link"
          onClick = {()=>setPage(page + 1)}
           >
            <FontAwesomeIcon icon={faChevronRight} />
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
