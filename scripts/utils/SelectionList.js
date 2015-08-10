/* @flow */
'use strict';

var SelectionList = {
    getSelected: function(items) {
        return items[this.getSelectedIndex(items)];
    },
    getSelectedIndex: function(items) {
        if(items.length === 0) {
            throw new Error('No items');
        }
        var index = -1;
        for (var i = 0, len = items.length; i < len; i++) {
            if(items[i].selected) {
                if(index === -1) {
                    index = i;
                } else {
                    throw new Error('Multiple items selected');
                }
            }
        }
        if(index === -1) {
            throw new Error('No items selected');
        }
        return index;
    },
    move: function(items, up) {
        var index = this.getSelectedIndex(items);

        if((up && index === 0) || (!up && index === items.length - 1)) {
            return items;
        }

        items[index].selected = false;
        items[index + (up ? -1 : 1)].selected = true;

        return items;
    },
    moveUp: function(items) {
        return this.move(items, true);
    },
    moveDown: function(items) {
        return this.move(items, false);
    }
};

module.exports = SelectionList;
