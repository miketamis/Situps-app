/* @flow */
'use strict';

var React = require('react');
var WorkoutStore = require('../stores/WorkoutStore');

var blackTriangle = String.fromCharCode(9656);
var whiteTriangle = String.fromCharCode(9657);
function getTriangleIcon(black) {
    if(black) {
        return blackTriangle;
    } else {
        return whiteTriangle;
    }
}

function getNumberIcon(number, black) {
    if(black) {
        return String.fromCharCode(10101 + number);
    }
    return String.fromCharCode(10111 + number);
}
function getState() {
    return {
        workout: WorkoutStore.getWorkout()
    };
}

var ProgressBar = React.createClass({

    getInitialState: function() {
        return getState();
    },
    componentDidMount: function() {
        WorkoutStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        WorkoutStore.removeChangeListener(this._onChange);
    },
    /**
    * @return {object}
    */
    render: function() {
        var number = 1;
        var createItem = function(item) {
            if(item.type === 'rest') {
                return getTriangleIcon(item.selected);
            }
            return getNumberIcon(number++, item.selected);
        };
        return <div className='progress-bar'>{ this.state.workout.map(createItem) }</div>;
    },
    _onChange: function() {
        this.setState(getState());
    }
});

module.exports = ProgressBar;
