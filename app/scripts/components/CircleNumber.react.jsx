/* @flow */
'use strict';

var React = require('react');

var MainMenu = React.createClass({
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
