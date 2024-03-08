import { useState, useEffect } from 'react';

function WeatherForecast() {

    const [city, setCity] = useState("");
    const [weather, setWeather] = useState([]);

    useEffect(() => {
        getWeatherData("Indore");
    }, []);

    function updateCity(value) {
        setCity(value.target.value);
    }

    function getWeatherData(data) {
        const apiKey = "b6936c6282aebf49c349ee8f23afc119";

        const GeocodingAPI = "https://api.openweathermap.org/geo/1.0/direct?q=" + data + "&appid=" + apiKey;

        fetch(GeocodingAPI)
            .then((response) => response.json())
            .then((data) => {

                const finalWeather = "https://api.openweathermap.org/data/2.5/weather?lat=" + data[0].lat + "&lon=" + data[0].lon + "&appid=" + apiKey;

                fetch(finalWeather)
                    .then((response) => response.json())
                    .then((data) => {
                        setWeather(data);
                    })
                    .catch((error) => {
                        console.log("Error : " + error);
                    });
            })
            .catch((error) => {
                console.log("Error : " + error)
                setWeather([]);
                alert("This is not an City");
            });
    }

    function searchCity(value) {
        getWeatherData(city);
    }

    const name = weather ? weather.name : 'N/A';
    const temp = weather.main ? weather.main.temp + " Kelvin" : 'N/A';
    const type = weather.weather ? weather.weather[0].main + " { " + weather.weather[0].description + " }" : 'N/A';
    const date = weather.dt ? new Date(weather.dt * 1000).toLocaleDateString() : 'N/A';
    const time = weather.dt ? new Date(weather.dt * 1000).toLocaleTimeString() : 'N/A';

    const sunrise = weather.sys ? new Date(weather.sys.sunrise * 1000).toLocaleTimeString() : 'N/A';
    const sunset = weather.sys ? new Date(weather.sys.sunset * 1000).toLocaleTimeString() : 'N/A';
    const humidity = weather.main ? weather.main.humidity + " %" : 'N/A';
    const pressure = weather.main ? weather.main.pressure + " hPa" : 'N/A';
    const wind = weather.wind ? weather.wind.speed + " M/S" : 'N/A';

    // return (
    //     <div className="h-2/4 w-2/4 flex flex-col gap-2 place-content-center place-items-cente">
    //         <div className='h-full w-full flex flex-col gap-2 place-content-center place-items-center'>
    //             <div className='h-full w-full flex flex-row gap-2 place-content-center place-items-center'>
    //                 <h1>"Weather Forecast App" Give The Best Weather Result Develop By Chayan Mulewa</h1>
    //             </div>
    //             <div className='h-full w-full flex flex-row gap-2 place-content-center place-items-center'>
    //                 <input className='h-full w-full px-2 bg-slate-200 text-black rounded-lg' type='text' placeholder='City' onChange={updateCity}></input>
    //                 <button className='bg-gray-400 px-4 py-2 rounded-lg bg-teal-600' onClick={searchCity}>Search</button>
    //             </div>

    //             <div className='h-full w-full flex flex-col gap-2 place-content-center place-items-center '>
    //                 {/* <div className='h-full w-full flex flex-row gap-2 place-content-center place-items-center p-3 bg-slate-200 text-black'>
    //                     <h1>Weather Icon</h1>
    //                 </div> */}
    //                 <div className='h-full w-full flex flex-row place-content-center place-items-center'>
    //                     <div className='h-full w-full flex flex-row gap-2 place-content-center place-items-center bg-black rounded-lg'>
    //                         <div className='h-full w-full flex flex-col gap-2 place-content-center p-3'>
    //                             <h1>Location : {name}</h1>
    //                             <h1>Temp : {temp}</h1>
    //                             <h1>Weather Type : {type}</h1>
    //                         </div>
    //                     </div>
    //                     <div className='h-full w-full flex flex-col gap-2 place-content-center p-3 bg-teal-600 rounded-lg'>
    //                         <h1>Date : {date}
    //                         </h1>
    //                         <h1>Time : {time}</h1>
    //                     </div>
    //                 </div>
    //                 <div className='h-full w-full flex flex-row gap-2 place-content-center place-items-center bg-slate-200  text-black rounded-lg'>
    //                     <div className='h-full w-full flex flex-col gap-2 place-content-center place-items-center p-3'>
    //                         <h1>Sunrise</h1>
    //                         <h1>{sunrise}</h1>
    //                     </div>
    //                     <div className='h-full w-full flex flex-col gap-2 place-content-center place-items-center p-3'>
    //                         <h1>Sunset</h1>
    //                         <h1>{sunset}</h1>
    //                     </div>
    //                     <div className='h-full w-full flex flex-col gap-2 place-content-center place-items-center p-3'>
    //                         <h1>Humidity</h1>
    //                         <h1>{humidity}</h1>
    //                     </div>
    //                     <div className='h-full w-full flex flex-col gap-2 place-content-center place-items-center p-3'>
    //                         <h1>Pressure</h1>
    //                         <h1>{pressure}</h1>
    //                     </div>
    //                     <div className='h-full w-full flex flex-col gap-2 place-content-center place-items-center p-3'>
    //                         <h1>Wind</h1>
    //                         <h1>{wind}</h1>
    //                     </div>
    //                 </div>
    //                 <div className='h-full w-full flex flex-col gap-2 place-content-center place-items-center'>
    //                     <h1>Note : For Best Experience Search Only City Names</h1>
    //                 </div>
    //             </div>

    //         </div>

    //     </div>
    // );

    return (
        <div className="h-full w-full flex flex-col items-center justify-center bg-gray-400">
            <div className="p-20 bg-gray-400">
                <h1 className="text-3xl mb-4 text-center">
                    "Weather Forecast App"
                </h1>
                <h1 className="text-3xl mb-4 text-center">
                    Develop by Chayan Mulewa
                </h1>
                <div className="flex flex-col gap-4">
                    <div className="flex gap-4">
                        <input
                            className="flex-grow px-4 py-2 bg-slate-200 text-black rounded-lg"
                            type="text"
                            placeholder="City"
                            onChange={updateCity}
                        />
                        <button
                            className="px-6 py-2 bg-teal-600 rounded-lg text-white"
                            onClick={searchCity}
                        >
                            Search
                        </button>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-grow bg-black rounded-lg p-4">
                            <h1 className="text-white mb-4">Location: {name}</h1>
                            <h1 className="text-white mb-4">Temp: {temp}</h1>
                            <h1 className="text-white">Weather Type: {type}</h1>
                        </div>

                        <div className="flex flex-col bg-teal-600 rounded-lg p-4 mt-4 md:mt-0 items-start justify-center">
                            <h1 className="text-white mb-4">Date: {date}</h1>
                            <h1 className="text-white">Time: {time}</h1>
                        </div>
                    </div>

                    <div className="flex flex-col place-content-between  bg-slate-200 text-black rounded-lg gap-4 p-4  md:flex-row gap-4">
                        <div className="flex flex-col">
                            <h1>Sunrise</h1>
                            <h1>{sunrise}</h1>
                        </div>
                        <div className="flex flex-col">
                            <h1>Sunset</h1>
                            <h1>{sunset}</h1>
                        </div>
                        <div className="flex flex-col">
                            <h1>Humidity</h1>
                            <h1>{humidity}</h1>
                        </div>
                        <div className="flex flex-col">
                            <h1>Pressure</h1>
                            <h1>{pressure}</h1>
                        </div>
                        <div className="flex flex-col">
                            <h1>Wind</h1>
                            <h1>{wind}</h1>
                        </div>
                    </div>

                    <div className="text-center mt-4">
                        <h1 className="text-gray-300">
                            Note: For the best experience, search only city names.
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );


}

export default WeatherForecast;
