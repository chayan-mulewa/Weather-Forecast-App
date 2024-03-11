import { useState, useEffect } from 'react';
import Card from './Card.jsx';
import backgroundImage from '../assets/background.jpg';

function WeatherForecast() {

    const [city, setCity] = useState('');
    const [weather, setWeather] = useState([]);

    useEffect(() => {
        getWeatherForecast('Ujjain');
    }, []);

    function updateCity(value) {
        setCity(value.target.value);
    }

    function getWeatherForecast(data) {
        const apiKey = 'b6936c6282aebf49c349ee8f23afc119';

        const GeocodingAPI = 'https://api.openweathermap.org/geo/1.0/direct?q=' + data + '&appid=' + apiKey;

        fetch(GeocodingAPI)
            .then((response) => response.json())
            .then((data) => {

                const finalWeather = 'https://api.openweathermap.org/data/2.5/weather?lat=' + data[0].lat + '&lon=' + data[0].lon + '&appid=' + apiKey;

                fetch(finalWeather)
                    .then((response) => response.json())
                    .then((data) => {
                        setWeather(data);
                    })
                    .catch((error) => {
                        console.log('Error  : ' + error);
                    });
            })
            .catch((error) => {
                console.log('Error  : ' + error)
                setWeather([]);
            });
    }

    function getWeatherForecastIcon(iconCode) {
        const IconAPI = 'https://openweathermap.org/img/wn/' + iconCode + '.png';
        return IconAPI;
    }

    function searchCity(value) {
        getWeatherForecast(city);
    }

    const name = weather.name ? weather.name : 'N/A';
    const temp = weather.main ? weather.main.temp : 'N/A';
    const finalTemp = weather.main ? (temp - 273.15).toFixed(2) + ' Deg' : 'N/A';
    const type = weather.weather ? weather.weather[0].description : 'N/A';

    const date = weather.dt ? new Date(weather.dt * 1000).toLocaleDateString() : 'N/A';
    const time = weather.dt ? new Date(weather.dt * 1000).toLocaleTimeString() : 'N/A';

    const sunrise = weather.sys ? new Date(weather.sys.sunrise * 1000).toLocaleTimeString() : 'N/A';
    const sunset = weather.sys ? new Date(weather.sys.sunset * 1000).toLocaleTimeString() : 'N/A';
    const humidity = weather.main ? weather.main.humidity + ' %' : 'N/A';
    const pressure = weather.main ? weather.main.pressure + ' hPa' : 'N/A';
    const wind = weather.wind ? weather.wind.speed + ' M/S' : 'N/A';

    const containerStyle = { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' };
    const icon = weather.weather ? weather.weather[0].icon : 'N/A';
    getWeatherForecastIcon(icon);
    
    return (
        <div style={containerStyle} className='min-h-screen min-w-screen flex flex-col justify-center items-center overflow-auto'>
            <div className='h-full w-full flex flex-col gap-4 p-4 justify-center items-center overflow-auto'>
                <div className='flex flex-col justify-center items-center gap-6 md:flex-row'>
                    <input className='w-full flex-grow px-4 py-2 text-black rounded-lg md:w-auto' type='text' placeholder='City' onChange={updateCity} />
                    <button className='w-full px-6 py-2 border rounded-lg backdrop-blur-sm md:w-auto' onClick={searchCity}>Search</button>
                </div>
                <div className='grid grid-cols-2 justify-center place-content-center place-items-center items-center gap-6 p-10 rounded-lg border backdrop-blur-sm md:grid-cols-5 sm:grid-cols-2'>
                    <Card label="Location" value={name} icon={require('../assets/location.png')} />
                    <Card label="Temperature" value={finalTemp} icon={require('../assets/temperature.png')} />
                    <Card label="Date" value={date} icon={require('../assets/date.png')} />
                    <Card label="Time" value={time} icon={require('../assets/time.png')} />
                    <Card label="Weather Type" value={type} icon={require('../assets/weather.png')} />
                    <Card label="Humidity" value={humidity} icon={require('../assets/humidity.png')} />
                    <Card label="Pressure" value={pressure} icon={require('../assets/pressure.png')} />
                    <Card label="Wind" value={wind} icon={require('../assets/wind.png')} />
                    <Card label="Sunrise" value={sunrise} icon={require('../assets/sunrise.png')} />
                    <Card label="Sunset" value={sunset} icon={require('../assets/sunset.png')} />
                </div>
                <div className='w-fit flex flex-col justify-center items-center gap-6 mt-4'>
                    <h1 className=''>
                        Develop By Chayan Mulewa
                    </h1>
                </div>
            </div>
        </div>
    );
}

export default WeatherForecast;
