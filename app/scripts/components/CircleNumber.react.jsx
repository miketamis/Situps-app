/* @flow */
'use strict';

var React = require('react');
var assert = require('assert');

var MainMenu = React.createClass({
    getInitialState: function() {
        assert(this.props.value, 'Value must be defined');
        return null;
    },
  /**
   * @return {object}
   */
    render: function() {
        return (
          <div className="circle">
            { this.props.value }
          </div>
        );
    }
});

module.exports = MainMenu;
