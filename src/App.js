import { useState } from 'react';
import './App.css';
import { WEATHER_API_KEY, WEATHER_API_URL } from './api';
import CurrentWeather from './components/current-weather/Current-Weather';
import Search from './components/search/Search';
import ForeCast from './components/forecast/ForeCast';


function App() {

  const [ currentWeather, setCurrentWeather] = useState(null)
  const [ forecastWeather, setForecastWeather] = useState(null)

  const onSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)

    const forecastWeatherFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)

    Promise.all([currentWeatherFetch, forecastWeatherFetch])
    .then(async (response) => {
      const currentWeatherResponse = await response[0].json();
      const forecastWeatherResponse = await response[1].json();

      setCurrentWeather({ city: searchData.label, ...currentWeatherResponse});
      setForecastWeather({ city: searchData.label, ...forecastWeatherResponse});
    })
    .catch((err) => console.log(err))
  }

  console.log(currentWeather);
  console.log(forecastWeather);
  return (
    <div className="container">
      <Search onSearchChange={onSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecastWeather && <ForeCast data={forecastWeather}/>}
    </div>
  );
}

export default App;


