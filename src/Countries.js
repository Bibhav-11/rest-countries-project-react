import Link from "./Link"
import { useState } from 'react';

import Search from './Search';
import Dropdown from './Dropdown';
import "./Countries.css"

const options = [
    {
      label: "Africa",
      value: "Africa",
    },
    {
      label: "Asia",
      value: "Asia"
    },
    {
      label: "Europe",
      value: "Europe"
    },
    {
      label: "Americas",
      value: "Americas"
    },
    {
      label: "Oceania",
      value: "Oceania"
    }
]
  

export default function Countries({ countries, setCountry, theme }) {
    const [selected, setSelected] = useState({
      label: 'Filter by Region',
      value: null
    });
    const [open, setOpen] = useState(false);
    const [searched, setSearched] = useState('');



    function hiddenCountry(country) {
      const isVisible = (country.name.common.toLowerCase().startsWith(searched.toLowerCase())) && (selected.value === null ? true : selected.value === country.region)
      if(isVisible) return "";
      else return "hidden";
    }

    const renderedCountry = countries.map(country => {
      return (
        <div onClick={() => setCountry(country.cca3)} key={country.name.common} className={`country ${hiddenCountry(country)}`}>
          <Link href={`./country`}>
            <img src={country.flags.png} className='country__flag' />
            <h2 className='country__title'>{country.name.common}</h2>
            <div className='country__information'>
              <p className='country__population'>Population: {country.population}</p>
              <p className='country__region'>Region: {country.region}</p>
              <p className='country__capital'>Capital: {country.capital}</p>
            </div>
          </Link>
        </div>  
      );
    })


    return (
        <div className="countries">
            <div className="container">
                <div className="search-section">
                    <Search theme={theme} query={searched} setQuery={setSearched} style={{width: '50%'}} className='countries__search' />
                    <Dropdown className='countries__dropdown' open={open} setOpen={setOpen} selected={selected} setSelected={setSelected} options={options} />
                </div>

                <div className='country-container'>

                  {renderedCountry}

               

                </div>

            </div>
        </div>
    );
}