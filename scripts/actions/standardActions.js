'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');

var standardActions = {
    optionSelected: function(option) {
        AppDispatcher.dispatch({
            actionType: 'optionSelected',
            Option: option
        });
    },

    setPage: function(p) {
        AppDispatcher.dispatch({
            actionType: 'setPage',
            page: p
        });
    },

    nextRep: function() {
        AppDispatcher.dispatch({
            actionType: 'nextRep'
        });
    },

    previousRep: function() {
        AppDispatcher.dispatch({
            actionType: 'previousRep'
        });
    },

    cancelWorkout: function() {
        AppDispatcher.dispatch({
            actionType: 'cancelWorkout'
        });
    },

    goBack: function() {
        AppDispatcher.dispatch({
            actionType: 'goBack'
        });
    },

    finishWorkout: function(change) {
        if(!change) {
            change = 0;
        }
        AppDispatcher.dispatch({
            actionType: 'finishWorkout',
            levelChange: change
        });
    }
};

module.exports = standardActions;
