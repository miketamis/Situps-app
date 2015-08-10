'use strict';
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var WorkoutStore = require('./WorkoutStore');

var CHANGE_EVENT = 'change';

var _pageHistory = ['MainMenu'];

function _pushPage(page) {
    _pageHistory.push(page);
}

function _setPage(page) {
    _pageHistory = [page];
}

function _goBack() {
    if(_pageHistory.length <= 1) {
        alert('Quit');
    } else {
        _pageHistory.pop();
    }
}

function _goHome() {
    _setPage('MainMenu');
}


var PageStore = assign({}, EventEmitter.prototype, {
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

    getPage: function() {
        return _pageHistory[_pageHistory.length - 1];
    }
});


PageStore.dispatchToken = AppDispatcher.register(function(action) {

    switch(action.actionType) {
    case 'optionSelected':
        _pushPage(action.Option);
        PageStore.emitChange();
        break;
    case 'setPage':
        _setPage(action.page);
        PageStore.emitChange();
        break;
    case 'cancelWorkout':
    case 'goBack':
        _goBack();
        PageStore.emitChange();
        break;
    case 'finishWorkout':
        _goHome();
        PageStore.emitChange();
        break;
    case 'resetData':
        AppDispatcher.waitFor([WorkoutStore.dispatchToken]);
        _setPage('Welcome');
        PageStore.emitChange();
        break;
    case 'calculateLevel':
        _pushPage('MainMenu');
        PageStore.emitChange();
        break;
    default:
        // no op
    }
});

module.exports = PageStore;
