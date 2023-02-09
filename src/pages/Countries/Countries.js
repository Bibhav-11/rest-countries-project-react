import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Search from "../../components/Search/Search";
import Dropdown from '../../components/Dropdown/Dropdown';
import "./Countries.css"
import axios from 'axios';

const options = [
    {
      label: "All",
      value: "null"
    },   
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
  

export default function Countries({ countries, theme, setCountries }) {
    const [selected, setSelected] = useState({
      label: 'Filter by Region',
      value: "null"
    });
    const [open, setOpen] = useState(false);
    const [searched, setSearched] = useState('');

    useEffect(() => {
      axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data);
      })
      
    }, []);


    function hiddenCountry(country) {
      console.log(selected);
      const isVisible = (country.name.common.toLowerCase().startsWith(searched.toLowerCase())) && (selected.value === "null" ? true : selected.value === country.region)
      if(isVisible) return "";
      else return "hidden";
    }

    const renderedCountry = countries.map(country => {
      return (
        <div key={country.name.common} className={`country ${hiddenCountry(country)}`}>
          <Link to={`./country/${country.name.common}`}>
            <img alt={country.name.common} src={country.flags.png} className='country__flag' />
            <h2 className='country__title'>{country.name.common}</h2>
            <div className='country__information'>
              <p className='country__population'>Population: <span>{country.population}</span></p>
              <p className='country__region'>Region: <span>{country.region}</span></p>
              <p className='country__capital'>Capital: <span>{country.capital}</span></p>
            </div>
          </Link>
        </div>  
      );
    })


    return (
        <div className="countries">
            <div className="container">
                <div className="search-section">
                    <Search theme={theme} query={searched} setQuery={setSearched} className='countries__search' />
                    <Dropdown className='countries__dropdown' open={open} setOpen={setOpen} selected={selected} setSelected={setSelected} options={options} />
                </div>

                <div className='country-container'>

                  {renderedCountry}

               

                </div>

            </div>
        </div>
    );
}