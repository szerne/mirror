'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.weatherService = undefined;

var _constants = require('constants');

var _Forecast = require('Forecast');

var _WeatherConditions = require('WeatherConditions');

var API_KEY = _constants.CONSTANTS.WEATHER_API_KEY;
var BASE_URL = '//api.wunderground.com/api/' + API_KEY + '/';
var FORECAST_URL = BASE_URL + 'hourly/q/';
var CONDITIONS_URL = BASE_URL + 'conditions/q/';

var weatherService = exports.weatherService = function () {
    var forecast = function forecast(coords, onSuccess) {
        var url = '' + FORECAST_URL + coords.lat + ',' + coords.lng + '.json';
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                var res = JSON.parse(xhr.responseText)['hourly_forecast'];
                var fc = new _Forecast.Forecast(res, 6);
                onSuccess(fc);
            }
        };
        xhr.send();
    };

    var conditions = function conditions(coords, onSuccess) {
        var url = '' + CONDITIONS_URL + coords.lat + ',' + coords.lng + '.json';
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                var res = JSON.parse(xhr.responseText)['current_observation'];
                var _conditions = new _WeatherConditions.WeatherConditions(res);
                onSuccess(_conditions);
            }
        };
        xhr.send();
    };

    var subscribe = function subscribe(method, timer, coords, cb) {
        if (!weatherService[method] || !weatherService[method].call) {
            return console.error('No weatherService method named' + method);
        }

        weatherService[method](coords, cb);
        setInterval(function () {
            weatherService[method](coords, cb);
        }, timer);
    };

    return { forecast: forecast, conditions: conditions, subscribe: subscribe };
}();
//# sourceMappingURL=weather.js.map
