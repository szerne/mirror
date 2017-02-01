import { CONSTANTS } from 'constants';
import { Forecast } from 'Forecast';
import { WeatherConditions } from 'WeatherConditions';

const API_KEY = CONSTANTS.WEATHER_API_KEY;
const BASE_URL = `//api.wunderground.com/api/${API_KEY}/`;
const FORECAST_URL = `${BASE_URL}hourly/q/`;
const CONDITIONS_URL = `${BASE_URL}conditions/q/`;

export const weatherService = (() => {
    const forecast = (coords, onSuccess) => {
        let url = `${FORECAST_URL}${coords.lat},${coords.lng}.json`;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = () => {
            if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                let res = JSON.parse(xhr.responseText)['hourly_forecast'];
                let fc = new Forecast(res, 6);
                onSuccess(fc);
            }
        };
        xhr.send();
    }

    const conditions = (coords, onSuccess) => {
        let url = `${CONDITIONS_URL}${coords.lat},${coords.lng}.json`;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = () => {
            if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                let res = JSON.parse(xhr.responseText)['current_observation'];
                let conditions = new WeatherConditions(res);
                onSuccess(conditions);
            }
        };
        xhr.send();
    }

    const subscribe = (method, timer, coords, cb) => {
        if(!weatherService[method] || !weatherService[method].call) {
            return console.error('No weatherService method named' + method);
        }

        weatherService[method](coords, cb);
        setInterval(() => {
            weatherService[method](coords, cb);
        }, timer)
    }

    return { forecast, conditions, subscribe }

})();




