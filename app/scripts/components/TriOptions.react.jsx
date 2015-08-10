/* @flow */
'use strict';

var React = require('react');
var Hint = require('./Hint.react.jsx');

//var Arrow = String.fromCharCode(9664);

var TriOptions = React.createClass({
    /**
    * @return {object}
    */
    render: function() {
        return (<div>
            <Hint className="tri-option" position="top" value={this.props.optionOne}/>
            <Hint className="tri-option" position="middle" value={this.props.optionTwo}/>
            <Hint className="tri-option" position="bottom" value={this.props.optionThree}/>
            </div>);
    }
});

module.exports = TriOptions;
