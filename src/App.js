import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Navigation from './Navigation';
import Countries from './Countries';
import Country from './Country';
import Route from './Route';

function App() {
  const [country, setCountry] = useState('');
  const [countries, setCountries] = useState([]);
  const [countryData, setCountryData] = useState([]);
  const [dark, setDark] = useState(true);

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
    .then(response => {
      setCountries(response.data);
    })
    
  }, []);

  useEffect(() => {
    if(country) {
        axios.get(`https://restcountries.com/v3.1/alpha/${country}`)
        .then(response => {
          setCountryData([response.data[0]]);
        })

      }
    }, [country])

  return (
    <div className={`app-container ${dark ? "" : "light"}`}>
      <Navigation theme={dark} setTheme={setDark} />

      <Route pathname='/'>
        <Countries theme={dark} countries={countries} setCountry={setCountry} />
      </Route>

      <Route pathname='/country'>
        <Country country={countryData} countries={countries} setCountry={setCountry} />
      </Route>

    </div>
    
  );
}

export default App;
