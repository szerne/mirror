'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var compliments = ['Confidence Looks Sexy On You.', 'Muy Caliente!', 'You\'re absolutely gorgeous, and that\'s the least interesting thing about you', 'Looking Great, Gorgeous!', 'You Are Beyonce Always.', 'You Look Incredible', 'Stunning!', 'Dayuuum!'];

var greetingService = exports.greetingService = function () {
    var index = 0;

    var randIx = function randIx() {
        var newIndex = Math.floor(Math.random() * compliments.length);
        if (newIndex === index) {
            randIx();
        } else {
            index = newIndex;
            return index;
        }
    };
    var getCompliment = function getCompliment() {
        return compliments[randIx()];
    };

    return { getCompliment: getCompliment };
}();
//# sourceMappingURL=greeting.js.map
