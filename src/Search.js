import React from 'react';
import "./Search.css"

export default function Search({ style, query, setQuery }) {
    return (
        <>
            <input onChange={(e) => setQuery(e.target.value)} style={style} placeholder='Search for a country...' className='search-input' type='text' />
        </>
    )
}