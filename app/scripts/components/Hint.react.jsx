/* @flow */
'use strict';

var React = require('react');

var SitupScreen = React.createClass({
    /**
    * @return {object}
    */
    render: function() {
        return (
            <div className={ this.props.className + ' hint ' + this.props.position }>
                {this.props.value}
            </div>
        );
    }
});

module.exports = SitupScreen;
