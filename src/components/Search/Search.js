import React from 'react';
import "./Search.css"

export default function Search({ theme, setQuery }) {
    return (
        <>
            <label className={`search-input-label ${theme ? "" : "light"}`}>
                <input onChange={(e) => setQuery(e.target.value)} placeholder='Search for a country...' className='search-input' type='text' />
            </label>
        </>
    )
}