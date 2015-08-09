'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');

var setupActions = {
    setAge: function(a) {
        AppDispatcher.dispatch({
            actionType: 'setAge',
            age: a
        });
    },
    resetData: function() {
        AppDispatcher.dispatch({
            actionType: 'resetData'
        });
    },
    resetAge: function() {
        AppDispatcher.dispatch({
            actionType: 'resetAge'
        });
    },
    resetLevel: function() {
        AppDispatcher.dispatch({
            actionType: 'resetLevel'
        });
    },
    calculateLevel: function() {
        AppDispatcher.dispatch({
            actionType: 'calculateLevel'
        });
    }
};

module.exports = setupActions;
