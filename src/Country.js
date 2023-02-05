import "./Country.css";
import Link from "./Link";

export default function Country({ country, countries, setCountry }) {

    const renderedCountryData = country.map(c => {
        let renderedBorder;
        if(!c.borders) {
            renderedBorder = [];
        }
        else renderedBorder = (c.borders.slice(0,3).map(code => {
            const neighbour = countries.find(c => code === c.cca3)
            return (
                <span onClick={() => setCountry(neighbour.cca3)} key={neighbour.name.common} className='button'>
                        <Link href="/country">
                            {neighbour.name.common}
                        </Link>
                </span>
            )
        }));
        return (
                <div className="details" key={c.name.common}>       
                    <img src={c.flags.svg} alt="" className="logo" />
                    <div className="information">
                        <h3 className="name">{c.name.common}</h3>
                        <div className="description">
                            <div>
                                <p className="native">Native Name: <span className="light" id="native">{c.name.nativeName[Object.keys(c.name.nativeName)[0]].common}</span></p>
                                <p className="population">Population: <span className="light" id="population">{c.population}</span></p>
                                <p className="region">Region: <span className="light" id="region">{c.region}</span></p>
                                <p className="sub-region">Sub Region: <span className="light" id="sub-region">{c.subregion}</span></p>
                                <p className="capital">Capital: <span className="light" id="capital">{c.capital}</span></p>
                            </div>
                            <div>
                                <p className="domain">Top Level Domain: <span className="light" id="domain">{c.tld}</span></p>
                                <p className="currencies">Currencies: <span className="light" id="currencies">{c.currencies[Object.keys(c.currencies)[0]].name}</span></p>
                                <p className="languages">Languages: <span className="light" id="languages">{Object.values(c.languages).sort().join(", ")}</span></p>
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
                <Link href='/'>
                    <button className="back button">Back</button>
                </Link>
                {renderedCountryData}
            </div>
        </div>
    )
}