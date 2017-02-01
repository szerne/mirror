'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var getHourShort = function getHourShort(time, ampm) {
    return time.split(':')[0] + ampm;
};
var getIconUrl = function getIconUrl(hour, icon) {
    var tod = +hour > 6 && +hour < 18 ? 'day' : 'night';
    return 'images/' + tod + '/' + icon + '.png';
};

var Forecast = exports.Forecast = function Forecast(data, hours) {
    _classCallCheck(this, Forecast);

    this.hourly = data.slice(0, hours).map(function (h) {
        return {
            hour: getHourShort(h.FCTTIME.civil, h.FCTTIME.ampm),
            icon: getIconUrl(h.FCTTIME.hour, h.icon),
            temp: h.temp.english
        };
    });
};
//# sourceMappingURL=Forecast.js.map
