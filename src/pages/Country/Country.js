import "./Country.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function renderItems(element, result = element) {
    return element ? result : "";
}



export default function Country({ countries }) {
    const [country, setCountry] = useState([]);
    const { countryName } = useParams();

    useEffect(() => {
        axios.get(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
        .then(response => setCountry(response.data))
    }, [countryName]);

    const renderedCountryData = country.map(c => {
        let renderedBorder;

        if(c.borders) {
            let borders = [];
            c.borders.slice(0,3).forEach(cCode => {
                const neighbour = countries.find(c => c.cca3 === cCode);
                if(neighbour) borders.push(neighbour);
            })
            
            renderedBorder = borders.map(border => {
                return (
                        <Link to={`/country/${border.name.common}`}>
                            <span key={border.name.common} className='button'>
                                {border.name.common}
                            </span>
                        </Link>
                );
            })
        }

        return (
                <div className="details" key={c.name.common}>       
                    <div className="logo-container"><img src={c.flags.svg} alt="" className="logo" /></div>
                    <div className="information">
                        <h3 className="name">{c.name.common}</h3>
                        <div className="description">
                            <div>
                                <p className="native">Native Name: <span className="light" id="native">{c.name.nativeName ? c.name.nativeName[Object.keys(c.name.nativeName)[0]].common: ""}</span></p>
                                <p className="population">Population: <span className="light" id="population">{renderItems(c.population)}</span></p>
                                <p className="region">Region: <span className="light" id="region">{renderItems(c.region)}</span></p>
                                <p className="sub-region">Sub Region: <span className="light" id="sub-region">{renderItems(c.subregion)}</span></p>
                                <p className="capital">Capital: <span className="light" id="capital">{renderItems(c.capital)}</span></p>
                            </div>
                            <div>
                                <p className="domain">Top Level Domain: <span className="light" id="domain">{renderItems(c.tld)}</span></p>
                                <p className="currencies">Currencies: <span className="light" id="currencies">{c.currencies ? c.currencies[Object.keys(c.currencies)[0]].name : ""}</span></p>
                                <p className="languages">Languages: <span className="light" id="languages">{renderItems(c.languages, Object.values(c.languages).sort().join(", "))}</span></p>
                            </div>
                        </div>
                        <div className="border">
                            <span className="bold">Border Countries:</span>
                            {renderedBorder}
                        </div>
                    </div>
                </div>

        );
    })

    return (
        <div className="country-info-container">
            <div className="container">
                <Link to='/'>
                    <div className="back button">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M19,6.41L17.59,5L7,15.59V9H5V19H15V17H8.41L19,6.41Z" />
                        </svg>
                        Back
                    </div>
                </Link>
                {renderedCountryData}
            </div>
        </div>
    )
}