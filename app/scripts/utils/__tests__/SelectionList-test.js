jest.dontMock('../SelectionList');

describe('SelectionList', function() {
    var SelectionList = require('../SelectionList');
    it('returns selected element', function() {
        var items = [{foo: 'bar'}, {awesome: 'a', selected: true}, {somevalue: 3}];
        expect(SelectionList.getSelected(items)).toBe(items[1]);
    });

    it('throws an error if multiple items are selected', function() {
        var items = [{foo: 'bar'}, {awesome: 'a', selected: true}, {somevalue: 3, selected: true}];
        expect(function() {
            SelectionList.getSelected(items);
        }).toThrow('Multiple items selected');
    });

    it('throws an error if no items are selected', function() {
        var items = [{foo: 'bar'}, {awesome: 'a'}, {somevalue: 3, selected: false}];
        expect(function() {
            SelectionList.getSelected(items);
        }).toThrow('No items selected');
    });

    it('throws an error if there are no items', function() {
        var items = [];
        expect(function() {
            SelectionList.getSelected(items);
        }).toThrow('No items');
    });

    describe('it can move items up and down', function() {
        var items = [{foo: 'bar', selected: true}, {awesome: 'a'}, {somevalue: 3}];
        var correctItemSelected = function(input_items, selected) {
            for(var i in input_items) {
                if(input_items[i].selected) {
                    expect(i).toBe(selected + '');
                } else {
                    expect(i).not.toBe(selected + '');
                }
            }
        };
        correctItemSelected(items, 0);
        it('Doesn\'t move go up anymore if first element is selected', function(){
            items = SelectionList.moveUp(items);
            correctItemSelected(items, 0);
        });

        it('Moves Down', function(){
            items = SelectionList.moveDown(items);
            correctItemSelected(items, 1);
            items = SelectionList.moveDown(items);
            correctItemSelected(items, 2);
        });

        it('Doesn\'t move go down anymore if last element is selected', function(){
            items = SelectionList.moveDown(items);
            correctItemSelected(items, 2);
        });

        it('Moves Up', function() {
            items = SelectionList.moveUp(items);
            correctItemSelected(items, 1);
            items = SelectionList.moveUp(items);
            correctItemSelected(items, 0);
        });

    });
});
