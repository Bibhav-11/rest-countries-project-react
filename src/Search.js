import React from 'react';
import "./Search.css"

export default function Search({ style, theme, setQuery }) {
    return (
        <>
            <label className={`search-input-label ${theme ? "" : "light"}`}>
                <input onChange={(e) => setQuery(e.target.value)} style={style} placeholder='Search for a country...' className='search-input' type='text' />
            </label>
        </>
    )
}