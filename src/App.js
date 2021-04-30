import React, { useEffect, useState } from 'react';
import './index.css';

const API = {
  key : '1c3e4d30aa5c2e797d6293dafdb2ba98',
  base_url : 'https://api.openweathermap.org/data/2.5/weather?q='
}

const App = () => {

  const[search, setSearch] = useState();
  const[weather, setWeather] = useState({});
  // console.log(weather.message);

  const searchData = (event) => {
    if(event.key === 'Enter') {
      fetch(`${API.base_url}${search}&units=metric&appid=${API.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
      });
    }
  }

  const dateBuilder = d => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${month} ${date} ${year}`;
  }

  let newClassName = "";
  if (weather.message === 'city not found'){
    newClassName = "not-found";
  } else {
      if (typeof weather.main !== 'undefined')
        if (weather.main.temp > 16)
          newClassName = "warm";
        else
          newClassName = "app";
      else
        newClassName = "";
  }

  return (
    
    <div className={newClassName}>
      <main>
        <div className="search-box">
          <input 
            type="search"
            className="search-bar"
            placeholder="Search Name Of City or State"
            onChange={event => setSearch(event.target.value)}
            value={search}
            onKeyPress={searchData}
          />
        </div>
        {(typeof weather.main != 'undefined') ? (
        <div>
          <ul className="location-data">
            <li className="location">{weather.name} {weather.sys.country}</li>
            <li className="date">{dateBuilder(new Date())}</li>
            <li className="weather-box">
              <ul>
                <li className="temperature">{Math.round(weather.main.temp)}°c</li>
                <li className="weather">{weather.weather[0].main}</li>
              </ul>
            </li>
          </ul>
        </div>
        ): ('')}
      </main>
    </div>
  );
}

export default App;
