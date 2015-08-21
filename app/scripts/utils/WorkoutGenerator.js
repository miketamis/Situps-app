'use strict';
var assert = require('assert');

function baseNumber(n, age) {
    return Math.ceil(Math.pow(n * (5 - age) / 4, 2));
}

var restAmount = 60;

var WorkoutGenerator = {
    generateWorkout: function(n, age) {
        assert(age === 0 || age === 1 || age === 2, 'Invalid Age');
        assert(n > 0 && Number.isInteger(n), 'Invalid Level');
        var base = baseNumber(n, age);
        var w1 = (n % 2) + n;
        var w2 = (n % 3) + (n % 2);
        var w3 = ((n + 1) % 2);
        return [
            {type: 'situps', amount: base},
            {type: 'rest', amount: restAmount},
            {type: 'situps', amount: base + w1},
            {type: 'rest', amount: restAmount},
            {type: 'situps', amount: base + w2},
            {type: 'rest', amount: restAmount},
            {type: 'situps', amount: base + w3}
        ];
    },
    calculateLevel: function(maxReps, age) {
        assert(maxReps > 0 && Number.isInteger(maxReps), 'Invalid Amount');
        assert(age === 0 || age === 1 || age === 2, 'Invalid Age');
        return Math.ceil(Math.sqrt(maxReps / 4) * 4 / (5 - age)) ;
    }
};

module.exports = WorkoutGenerator;
