/* @flow */
'use strict';

var React = require('react');
var Hint = require('./Hint.react.jsx');
var CircleNumber = require('./CircleNumber.react.jsx');
var WorkoutStore = require('../stores/WorkoutStore');
var standardActions = require('../actions/standardActions');


var RestScreen = React.createClass({
    getInitialState: function() {
        return {rest: WorkoutStore.getCurrentRest(), total: WorkoutStore.getCurrentRest()};
    },
    tick: function() {
        var newRest = this.state.rest - 1;
        if(newRest <= 0) {
            standardActions.nextRep();
        } else {
            this.setState({rest: this.state.rest - 1});
        }
    },
    componentDidMount: function() {
        this.interval = setInterval(this.tick, 1000);
    },
    componentWillUnmount: function() {
        clearInterval(this.interval);
    },

    generateStyle: function(i) {
        var bC = 'white';
        var LoadingBar = 'tomato';
        if(i > 180) {
            return { backgroundImage: 'linear-gradient(' + (i - 270) +
                 'deg, ' + LoadingBar + ' 50%, transparent 50%, transparent),' +
                 ' linear-gradient(270deg, '+ LoadingBar + ' 50%, ' + bC + ' 50%, ' + bC + ')'};
        }
        return {backgroundImage:
            'linear-gradient(90deg, '+ bC + ' 50%, transparent 50%, transparent),' +
            ' linear-gradient(' + (i + 90) + 'deg, ' + LoadingBar + ' 50%, ' + bC +
            ' 50%, ' + bC + ')'};
    },

    /**
    * @return {object}
    */
    render: function() {
        var percentage = this.state.rest * 360 / this.state.total;
        return (
            <div>
                <Hint position="middle" value="&#9193;"/>
                <div style={this.generateStyle(percentage)} className='doSitups'>
                    <span> Rest For </span>
                    <CircleNumber value={this.state.rest } />
                    <span> Seconds </span>
                </div>
            </div>
        );
    }
});

module.exports = RestScreen;
