
import _ from 'lodash';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import style from './Pagination.module.css'

const Pagination = ({shows,changePageNumber,pageNumber,pageSize}) => {

    const pageCount = Math.ceil(shows.length / pageSize);
   
  if (pageCount === 1) return <></>;
    
 
  const pages = _.range(0, pageCount);
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map((page) => {
          return (
            <li
              className={page === pageNumber ? "page-item active" : "page-item"}
              key={page}
              onClick={() => changePageNumber(page)}
              style={{color:"black !important"}}
            >
              <Link className="page-link" style={{color:"black !important"}} to="#">
                {page + 1}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Pagination
