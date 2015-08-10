/* @flow */
'use strict';

var React = require('react');
var setupActions = require('../../actions/setupActions');
var standardActions = require('../../actions/standardActions');
var TriOptions = require('../TriOptions.react.jsx');

var AgeScreen = React.createClass({
    watchListener: function(message) {
        switch(message.data) {
        case 'up-button:click':
            setupActions.setAge(0);
            break;
        case 'middle-button:click':
            setupActions.setAge(1);
            break;
        case 'down-button:click':
            setupActions.setAge(2);
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
              <TriOptions optionOne="I'm Under 30 Years Old"
                   optionTwo="I'm between 30 and 39 Years Old"
                   optionThree="I'm 40 Years Old or Over" />
          </div>
        );
    }
});

module.exports = AgeScreen;
