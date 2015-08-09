/* @flow */
'use strict';
var React = require('react');
var classNames = require('classnames');
var SelectionList = require('../utils/SelectionList');

var ListMenu = React.createClass({
    getInitialState: function() {
        var self = this;
        try {
            SelectionList.getSelected(this.props.items);
        } catch(err) {
            if(err) {
                if(err.message === 'No items selected') {
                    self.props.items[0].selected = true;
                    return;
                }
                throw err;
            }
        }
        return {items: this.props.items};
    },
    watchListener: function(message) {
        switch(message.data) {
        case 'up-button:click':
            this._moveUp();
            break;
        case 'down-button:click':
            this._moveDown();
            break;
        case 'middle-button:click':
            this._select();
            break;
        }
    },
    componentDidMount: function() {
        window.addEventListener('message', this.watchListener);
    },
    componentWillUnmount: function() {
        window.removeEventListener('message', this.watchListener);
    },
    _select: function() {
        var self = this;
        self.props.onSelect(SelectionList.getSelected(this.state.items));
    },
    _moveUp: function() {
        this.setState({items: SelectionList.moveUp(this.state.items)});
    },
    _moveDown: function() {
        this.setState({items: SelectionList.moveDown(this.state.items)});
    },
    /**
    * @return {object}
    */
    render: function() {
        var createItem = function(item, index) {
            var classes = classNames({ 'selected': item.selected });
            return <li key={index} className={classes}>{ item.text }</li>;
        };
        return <ul>{this.state.items.map(createItem)}</ul>;
    }
});


module.exports = ListMenu;
