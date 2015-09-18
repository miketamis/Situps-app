/* @flow */
'use strict';

var React = require('react');
var Hint = require('./Hint.react.jsx');
var assert = require('assert');

var TriOptions = React.createClass({
    /**
    * @return {object}
    */
    render: function() {
        assert(this.props.optionOne, 'optionOne must be defined');
        assert(this.props.optionTwo, 'optionTwo must be defined');
        assert(this.props.optionThree, 'optionThree must be defined');
        
        return (<div>
            <Hint className="tri-option" position="top" value={this.props.optionOne}/>
            <Hint className="tri-option" position="middle" value={this.props.optionTwo}/>
            <Hint className="tri-option" position="bottom" value={this.props.optionThree}/>
            </div>);
    }
});

module.exports = TriOptions;
