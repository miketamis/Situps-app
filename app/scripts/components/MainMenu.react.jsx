/* @flow */
'use strict';

var React = require('react');
var ListMenu = require('./ListMenu.react.jsx');
var standardActions = require('../actions/standardActions');

var MainMenu = React.createClass({
    watchListener: function(message) {
        switch(message.data) {
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
    onSelect: function(option) {
        standardActions.optionSelected(option.text);
    },
    /**
    * @return {object}
    */
    render: function() {
        var menuList = [{text: 'Start'}, {text: 'Setting'}];
        return (
            <div>
            <ListMenu items={menuList} onSelect={this.onSelect } />
            </div>
        );
    }
});

module.exports = MainMenu;
