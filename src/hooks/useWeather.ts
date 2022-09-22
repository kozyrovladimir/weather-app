import {useAppSelector} from "./redux";
import {weatherAPI} from "../services/WeatherService";

export const useWeather = () => {
    const {lat, lon} = useAppSelector(state => state.locationReducer);
    const {data: currentWeather, error: weatherError, isLoading: weatherIsLoading} = weatherAPI.useGetWeatherQuery({
        lat,
        lon
    });

    const nullСelsiusInKelvin = 273.15;

    const windSpeed = !currentWeather ? '--/--' : `${Math.round(currentWeather.wind.speed)} м/с`;
    const pressure = !currentWeather ? '--/--' : `${currentWeather.main.pressure} мм рт. ст.`;
    const humidity = !currentWeather ? '--/--' : `${currentWeather.main.humidity} %`;
    const chanceOfRain = !currentWeather ? '--/--' : `${currentWeather.clouds.all} %`;
    const iconUri = !currentWeather ? null : `http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`;
    const temp = !currentWeather ? '--/--' : `${Math.round(currentWeather.main.temp - nullСelsiusInKelvin)} °`;
    const weatherDescription = !currentWeather ? '--/--' : currentWeather.weather[0].description;
    const cityName = !currentWeather ? '--/--' : currentWeather.name;

    return {
        windSpeed,
        pressure,
        humidity,
        chanceOfRain,
        iconUri,
        temp,
        weatherDescription,
        cityName,
    }
}
