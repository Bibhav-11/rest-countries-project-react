import "./Pagination.css"
import { useState } from "react";

export default function Pagination({totalCountries, countriesPerPage, paginate, curr}) {
    let pages = [];

    for(let i = 1; i <= Math.ceil(totalCountries/countriesPerPage); i++) {
        pages.push(i);
    }

    return (
        <div className="pagination">
            <a onClick={(e) => {e.preventDefault(); paginate(prev => prev - 1 == 0 ? prev : prev-1)}} className={`page`} href="#" >{'<'}</a>
            {pages.map(p => {
                return <a onClick={(e) => {e.preventDefault(); paginate(p)}} key={p} className={`page ${curr==p? 'active': ''}`} href="#" >{p}</a>
            })}
            <a onClick={(e) => {e.preventDefault(); paginate(prev => prev + 1 > pages.length ? prev : prev+1); console.log(curr);}} className={`page`} href="#" >{'>'}</a>
        </div>
    )

}