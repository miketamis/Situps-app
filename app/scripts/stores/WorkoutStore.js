/*jslint browser: true */
'use strict';
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var SelectionList = require('../utils/SelectionList');
var workoutGenerator = require('../utils/WorkoutGenerator');
var assert = require('assert');

var CHANGE_EVENT = 'change';

var _workout = [];

function isNumber (o) {
    return o.toFixed;
}

function _getAge() {
    var age = parseInt(localStorage.getItem('age'));
    if(age !== 0 && !age) {
        throw new Error('No Age');
    }
    return age;
}

function _resetData() {
    localStorage.clear();
}

function _setLevel(level) {
    assert(level, 'Level must be defined');
    assert(isNumber(level), 'Trying to set level to a value that isn\'t a number');
    localStorage.setItem('level', level);
}

function _calculateLevel(amount) {
    _setLevel(workoutGenerator.calculateLevel(amount, _getAge()));
}


function _getLevel() {
    var level = parseInt(localStorage.getItem('level'));
    if(!level) {
        throw new Error('No Level');
    }
    assert(level > 0 && Number.isInteger(level), 'Invalid Level');
    return level;
}

function _incrementLevel(i) {
    if(i !== 0) {
        var level = _getLevel() + i;
        _setLevel(level);
    }
}

function _resetLevel() {
    localStorage.removeItem('level');
}

function _setAge(age) {
    assert(age === 0 || age === 1 || age === 2, 'Invalid Age');
    localStorage.setItem('age', age);
}

function _resetWorkout() {
    _workout = workoutGenerator.generateWorkout(_getLevel(), _getAge());
    _workout[0].selected = true;
}

function _getWorkout() {
    if(!_workout || _workout.length === 0) {
        _resetWorkout();
    }
    return _workout;
}



function _getCurrent(type) {

    var selected = SelectionList.getSelected(_getWorkout());
    if(selected.type === type) {
        return selected;
    }
    throw Error('current step isn\'t ' + type);
}

function _goBack() {
    _workout = SelectionList.moveUp(_getWorkout());
}

function _nextRep() {
    _workout = SelectionList.moveDown(_getWorkout());
}



var WorkoutStore = assign({}, EventEmitter.prototype, {
    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    /**
    * @param {function} callback
    */
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    /**
    * @param {function} callback
    */
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },
    getCurrentSitup: function() {
        return _getCurrent('situps').amount;
    },
    getCurrentRest: function() {
        return _getCurrent('rest').amount;
    },
    getWorkout: function() {
        return _getWorkout();
    },
    onFirst: function() {
        return _getWorkout()[0].selected;
    },
    onLast: function() {
        return _getWorkout()[_getWorkout().length - 1].selected;
    },
    getCurrentType: function() {
        return SelectionList.getSelected(_getWorkout()).type;
    },
    hasLevelData: function() {
        return !!localStorage.getItem('level');
    },
    hasAgeData: function() {
        return !!localStorage.getItem('age');
    }
});


WorkoutStore.dispatchToken = AppDispatcher.register(function(action) {
    switch(action.actionType) {
    case 'previousRep':
        _goBack();
        WorkoutStore.emitChange();
        break;
    case 'nextRep':
        _nextRep();
        WorkoutStore.emitChange();
        break;
    case 'finishWorkout':
        _incrementLevel(action.levelChange);
        _resetWorkout();
        WorkoutStore.emitChange();
        break;
    case 'cancelWorkout':
        _resetWorkout();
        WorkoutStore.emitChange();
        break;
    case 'setAge':
        _setAge(action.age);
        WorkoutStore.emitChange();
        break;
    case 'resetAge':
        _resetData();
        WorkoutStore.emitChange();
        break;
    case 'resetData':
        _resetData();
        WorkoutStore.emitChange();
        break;
    case 'calculateLevel':
        _calculateLevel(action.amount);
        break;
    case 'resetLevel':
        _resetLevel();
        WorkoutStore.emitChange();
        break;
    default:
        // no op
    }
});

module.exports = WorkoutStore;
