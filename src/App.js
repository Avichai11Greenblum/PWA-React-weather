import React, {useState} from 'react';

import {fetchWeather} from './api/fetchWeather';
import './App.css';

const App = () => {

    //* useState hooks
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});
    
    //* A function for searching for a location after 'Enter' has been pressed
    const search = async (e) => {

        if (e.key === 'Enter'){
            const data = await fetchWeather(query);
            setWeather(data);
            setQuery('');
        };
    };
    
    return(
        <div className="main-container">
            <input
                type="text"
                className="search"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={search}
            />
            
            {weather.main && (  //? && means if it exists make the following and if not so don't
                <div className="city">
                    <h2 className="city-name">
                        <span>{weather.name}</span>
                        <sup>{weather.sys.country}</sup>
                    </h2>

                    <div className="city-temp">
                        {Math.round(weather.main.temp)}
                        <sup>&deg;c</sup>
                    </div>

                    <div className="info">
                        <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png` } alt="icon"/>
                        <p>{weather.weather[0].description}</p>
                        <p>Humidity: {weather.main.humidity}</p>
                        <p>Feels like: {weather.main.feels_like}</p>
                    </div>

                </div>
            )}
        </div>
    ); 
};

export default App;
