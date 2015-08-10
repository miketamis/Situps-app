/* @flow */
'use strict';

var React = require('react');
var standardActions = require('../actions/standardActions');
var TriOptions = require('./TriOptions.react.jsx');

var DoneScreen = React.createClass({
    watchListener: function(message) {
        switch(message.data) {
        case 'up-button:click':
            standardActions.finishWorkout(1);
            break;
        case 'middle-button:click':
            standardActions.finishWorkout(0);
            break;
        case 'down-button:click':
            standardActions.finishWorkout(-1);
            break;
        case 'back-button:click':
            standardActions.goBack();
            break;
        }
    },
    componentDidMount: function() {
        window.addEventListener('message', this.watchListener);
    },
    componentWillUnmount: function() {
        window.removeEventListener('message', this.watchListener);
    },
    /**
    * @return {object}
    */
    render: function() {
        return (
          <div>
              <TriOptions optionOne="Too Easy" optionTwo="Just Right" optionThree="Too Hard" />
          </div>
        );
    }
});

module.exports = DoneScreen;
