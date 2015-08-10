/* @flow */
'use strict';

var React = require('react');
var Hint = require('../Hint.react.jsx');
var standardActions = require('../../actions/standardActions');

var WelcomeScreen = React.createClass({
    watchListener: function(message) {
        switch(message.data) {
        case 'middle-button:click':
            standardActions.optionSelected('Setup');
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
            <Hint position="middle" value="&#10003;"/>
            <div id='welcome-screen'> <h2> Welcome to: </h2> <h1> Situp App </h1></div>
            </div>
        );
    }
});

module.exports = WelcomeScreen;
