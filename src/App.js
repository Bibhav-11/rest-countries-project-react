import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Navigation from './Navigation';
import Countries from './Countries';
import Country from './Country';
import { Routes, Route } from 'react-router-dom';

function App() {
  const [countries, setCountries] = useState([]);
  const [dark, setDark] = useState(true);

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
    .then(response => {
      setCountries(response.data);
    })
    
  }, []);

  return (
    <div className={`app-container ${dark ? "" : "light"}`}>
      <Navigation theme={dark} setTheme={setDark} />

      <Routes>
        <Route path='/' element={<Countries theme={dark} countries={countries} />} />
        <Route path='/country/:countryName' element={<Country countries={countries}/>} />
      </Routes>


    </div>
    
  );
}

export default App;
