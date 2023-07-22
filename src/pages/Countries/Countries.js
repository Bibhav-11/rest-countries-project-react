import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Search from "../../components/Search/Search";
import Dropdown from '../../components/Dropdown/Dropdown';
import "./Countries.css"
import axios from 'axios';
import Pagination from '../../components/Pagination/Pagination';

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
    const [currentPage, setCurrentPage] = useState(1);
    const [countriesPerPage, setCountriesPerPage] = useState(20);


    useEffect(() => {
      axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data);
      })
      
    }, []);


    useEffect(() => {
      setCurrentPage(1);
    }, [searched, selected]);

    // function hiddenCountry(country) {
    //   console.log(selected);
    //   const isVisible = (country.name.common.toLowerCase().startsWith(searched.toLowerCase())) && (selected.value === "null" ? true : selected.value === country.region)
    //   if(isVisible) return "";
    //   else return "hidden";
    // }

    const filteredCountries = countries.filter(c => c.name.common.toLowerCase().startsWith(searched.toLowerCase()) && (selected.value === "null" ? true : selected.value === c.region));

    const indexOfLastPage = currentPage * countriesPerPage;
    const indexOfFirstPage = indexOfLastPage - countriesPerPage;
    const paginatedCountries = filteredCountries.slice(indexOfFirstPage, indexOfLastPage);

    const renderedCountry = paginatedCountries.map(country => {
      return (
        <div key={country.name.common} className={`country`}>
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

                  <Pagination curr={currentPage} paginate={setCurrentPage} totalCountries={filteredCountries.length} countriesPerPage={countriesPerPage} />
            </div>
        </div>
    );
}