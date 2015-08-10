/*jslint browser: true */
'use strict';
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var SelectionList = require('../utils/SelectionList');
var workoutGenerator = require('../utils/WorkoutGenerator');

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
    if(isNaN(age)) {
        throw new Error('Age is not a number');
    }
    return age;
}

function _resetData() {
    localStorage.clear();
}

function _setLevel(level) {
    if(!isNumber(level)) {
        throw new Error('Trying to set level to a value that isn\'t a number');
    }
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
    if(isNaN(level)) {
        throw new Error('Level is not a number');
    }
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
    if(!isNumber(age)) {
        throw new Error('Trying to set age to a value that isn\'t a number');
    }
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
        return _workout;
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
