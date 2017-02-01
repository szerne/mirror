'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Set Nashville to Default Location
var defaultLat = 36.174465;
var defaultLng = -86.767960;

var Location = exports.Location = function () {
    function Location() {
        _classCallCheck(this, Location);
    }

    _createClass(Location, [{
        key: 'getCoords',
        value: function getCoords(onSuccess, onError) {
            var _this = this;

            if (this.hasGeoLocation) {
                navigator.geolocation.getCurrentPosition(function (pos) {
                    _this.lat = pos.coords.latitude;
                    _this.lng = pos.coords.longitude;
                    onSuccess({ lat: _this.lat, lng: _this.lng });
                }, function (err) {
                    onError(err);
                });
            } else {
                console.warn('Geolocation not found. Using default values');
                this.lat = defaultLat;
                this.lng = defaultLng;
                onSuccess({ lat: this.lat, lng: this.lng });
            }
        }
    }, {
        key: 'hasGeoLocation',
        get: function get() {
            return !!navigator && !!navigator.geolocation && !!navigator.geolocation.getCurrentPosition;
        }
    }]);

    return Location;
}();
//# sourceMappingURL=location.js.map
