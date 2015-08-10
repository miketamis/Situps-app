/*jslint browser: true */
'use strict';

var React = require('react');
var SitupApp = require('./components/SitupApp.react.jsx');
var mountNode = document.getElementById('app');

var setupActions = require('./actions/setupActions');
var WorkoutStore = require('./stores/WorkoutStore');

if(!WorkoutStore.hasLevelData() || !WorkoutStore.hasAgeData()) {
    setupActions.resetData();
}

React.render(<SitupApp />, mountNode);
