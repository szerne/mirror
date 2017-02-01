'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var voiceService = exports.voiceService = function () {
    var commands = {};

    var whenSaid = function whenSaid(trigger, cb) {
        commands[trigger] = cb;
        return voiceService;
    };

    var start = function start() {
        if (!annyang) {
            return console.warn('Voice detection is unavailable');
        }

        annyang.addCallback('start', function () {
            return console.debug('voice recognition started');
        });
        annyang.addCallback('end', function () {
            return console.warn('voice recognition ended');
        });
        annyang.addCommands(commands);
        annyang.start();
    };

    var getTriggers = function getTriggers() {
        return Object.keys(commands);
    };

    return { whenSaid: whenSaid, start: start, getTriggers: getTriggers };
}();
//# sourceMappingURL=voiceService.js.map
