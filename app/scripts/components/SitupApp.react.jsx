/* @flow */
'use strict';
var React = require('react');
var MainMenu = require('./MainMenu.react.jsx');
var PageStore = require('../stores/PageStore');
var WorkoutStore = require('../stores/WorkoutStore');
var WorkoutScreen = require('./WorkoutScreen.react.jsx');
var DoneScreen = require('./DoneScreen.react.jsx');
var Welcome = require('./firstUse/Welcome.react.jsx');
var AgeScreen = require('./firstUse/AgeScreen.react.jsx');
var InitialTest = require('./firstUse/InitialTest.react.jsx');
var SettingScreen = require('./SettingScreen.react.jsx');

function getPageState() {
    return {
        page: PageStore.getPage()
    };
}

var SitupApp = React.createClass({
    getInitialState: function() {
        return getPageState();
    },
    componentDidMount: function() {
        PageStore.addChangeListener(this._onChange);
        WorkoutStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        PageStore.removeChangeListener(this._onChange);
        WorkoutStore.removeChangeListener(this._onChange);
    },
    /**
    * @return {object}
    */
    render: function() {
        var Child = this._getComponent();
        return (
            <div>
            <Child />
            </div>
        );
    },
    _onChange: function() {
        this.setState(getPageState());
    },
    _getComponent: function() {
        switch(this.state.page) {
        case 'MainMenu': return MainMenu;
        case 'Start': return WorkoutScreen;
        case 'Done': return DoneScreen;
        case 'Welcome': return Welcome;
        case 'Setup':
            if(!WorkoutStore.hasAgeData()) return AgeScreen;
            return InitialTest;
        case 'Setting': return SettingScreen;
        }
        throw new Error('No page called: ' + this.state.page);
    }

});


module.exports = SitupApp;
