/* @flow */
'use strict';

var React = require('react');
var assert = require('assert');

var SitupScreen = React.createClass({
    /**
    * @return {object}
    */
    render: function() {
        assert(['top', 'middle', 'bottom'].indexOf(this.props.position) != -1,
         'position must be one of top, middle or bottom');
        assert(this.props.value, 'Value must be defined');

        return (
            <div className={ this.props.className + ' hint ' + this.props.position }>
                {this.props.value}
            </div>
        );
    }
});

module.exports = SitupScreen;
