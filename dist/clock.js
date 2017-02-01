'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var clock = exports.clock = function () {
    var init = function init(cb) {
        setInterval(function () {
            var dateTime = moment();
            cb({
                date: dateTime.format('dddd, MMMM Do'),
                time: dateTime.format('hh:mm A')
            });
        }, 1000);
    };

    return { init: init };
}();
//# sourceMappingURL=clock.js.map
