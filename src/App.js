import { useState, useEffect } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Countries from './pages/Countries/Countries';
import Country from './pages/Country/Country';
import { Routes, Route } from 'react-router-dom';

function App() {
  const [countries, setCountries] = useState([]);
  const [dark, setDark] = useState(true);

  return (
    <div className={`app-container ${dark ? "" : "light"}`}>
      <Navigation theme={dark} setTheme={setDark} />

      <Routes>
        <Route path='/' element={<Countries theme={dark} countries={countries} setCountries={setCountries} />} />
        <Route path='/country/:countryName' element={<Country countries={countries}/>} />
      </Routes>


    </div>
    
  );
}

export default App;
