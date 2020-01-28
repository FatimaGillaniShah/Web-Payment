import React from 'react';
import _ from 'lodash';

const Pagination = props => {
 const {itemsCount, pageSize, currentPage} = props;
 const pagesCount = Math.ceil(itemsCount / pageSize);
 if(pagesCount === 1)  return null;
 const pages = _.range(1,pagesCount + 1);
    
    return <nav>

      <ul className="pagination pull-right" style={{display:"flex!important"}}>
          {pages.map(page =>(
            <li key={page} style={{cursor:'pointer'}} className={page === currentPage ? 'page-item active' : 'page-item' }>
             <div className="page-link" onClick ={() => props.onPageChange(page)}>{page}</div>
            </li>
          ))}
     
      </ul>
    </nav>
  
}

export default Pagination;
