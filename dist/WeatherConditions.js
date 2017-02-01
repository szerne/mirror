'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var getIconUrl = function getIconUrl(icon) {
    var hour = new Date().getHours();
    var tod = +hour > 6 && +hour < 18 ? 'day' : 'night';
    return 'images/' + tod + '/' + icon + '.png';
};

var WeatherConditions = exports.WeatherConditions = function WeatherConditions(data) {
    _classCallCheck(this, WeatherConditions);

    this.location = data['display_location'].full;
    this.temp = Math.round(data['temp_f']);
    this.weather = data.weather;
    this.icon = getIconUrl(data.icon);
};
//# sourceMappingURL=WeatherConditions.js.map
