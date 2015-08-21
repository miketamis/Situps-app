jest.dontMock('../ListMenu.react.jsx');
jest.dontMock('classnames');

describe('ListMenu', function () {
    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;

    function testRender(DOM, whatToExpect) {
        var items = TestUtils.scryRenderedDOMComponentsWithTag(DOM, 'li');
        expect(items.length).toEqual(whatToExpect.length);
        for(var i in whatToExpect) {
            if(whatToExpect[i].selected) {
                expect(items[i].getDOMNode().className).toEqual('selected');
            } else {
                expect(items[i].getDOMNode().className).toEqual('');
            }

            expect(items[i].getDOMNode().textContent).toEqual(whatToExpect[i].text);
        }
    }

    it('can\'t have no items', function () {
        var ListMenu = require('../ListMenu.react.jsx');
        expect(function() {
            TestUtils.renderIntoDocument(< ListMenu/>);
        }).toThrow('No items in ListMenu');
    });

    it('can\'t have empty list of items', function() {
        var ListMenu = require('../ListMenu.react.jsx');
        expect(function() {
            TestUtils.renderIntoDocument(< ListMenu items={[]}/>);
        }).toThrow('No items in ListMenu');
    });

    it('can\'t have list of items with multiple selected', function() {
        var SelectionList = require('../../utils/SelectionList');
        var ListMenu = require('../ListMenu.react.jsx');
        SelectionList.getSelected.mockImplementation(function() {
            throw new Error('Multiple items selected');
        });
        var menuList = [{text: 'Menu item 1', selected: true}, {text: 'Menu Item 2', selected: true}];
        expect(function() {
            TestUtils.renderIntoDocument(< ListMenu items={menuList}/>);
        }).toThrow('Multiple items selected');
    });

    it('renders', function() {
        var ListMenu = require('../ListMenu.react.jsx');
        var menuList = [{text: 'Menu item 1', selected: true}, {text: 'Menu Item 2'}];
        var DOM = TestUtils.renderIntoDocument(<ListMenu items={menuList} />);
        testRender(DOM, menuList);
        DOM.componentWillUnmount();
    });

    it('Selects the first item if no items are selected', function() {
        var SelectionList = require('../../utils/SelectionList');
        var ListMenu = require('../ListMenu.react.jsx');
        SelectionList.getSelected.mockImplementation(function() {
            throw new Error('No items selected');
        });
        var menuList = [{text: 'Menu item 1'}, {text: 'Menu Item 2'}];
        var DOM = TestUtils.renderIntoDocument(<ListMenu items={menuList} />);
        menuList[0].selected = true; //if no items are selected first item should become selected;
        expect(SelectionList.getSelected).toBeCalledWith(menuList);
        testRender(DOM, menuList);
        DOM.componentWillUnmount();
    });

    it('can\'t have an input without text value', function() {
        var ListMenu = require('../ListMenu.react.jsx');
        var menuList = [{text: 'Menu item 1'}, {notText: 'Menu Item 2'}];
        expect(function() {
            TestUtils.renderIntoDocument(<ListMenu items={menuList} />);
        }).toThrow('Items do not have text value or text value isn\'t a string');
    });

    it('can\'t have an input with Non-string values', function() {
        var ListMenu = require('../ListMenu.react.jsx');
        var menuList = [{text: 'Menu item 1'}, {text: 2}];
        expect(function() {
            TestUtils.renderIntoDocument(<ListMenu items={menuList} />);
        }).toThrow('Items do not have text value or text value isn\'t a string');
    });

    describe('You can move up and down', function() {
        var SelectionList = require('../../utils/SelectionList');
        SelectionList.moveUp.mockReturnValue([{text: 'Menu item 1', selected:true}, {text: 'Menu Item 2'}]);
        SelectionList.moveDown.mockReturnValue([{text: 'Menu item 1'}, {text: 'Menu Item 2', selected:true}]);
        var ListMenu = require('../ListMenu.react.jsx');
        var menuList = [{text: 'Menu item 1', selected:true}, {text: 'Menu Item 2'}];
        var DOM = TestUtils.renderIntoDocument(<ListMenu items={menuList} />);
        testRender(DOM, menuList);
        it('does\'t do anything when moved up if top element is selected', function() {
            DOM.watchListener({data:'up-button:click'});
            testRender(DOM, menuList);
        });

        it('moves down', function() {
            DOM.watchListener({data:'down-button:click'});
            menuList[0].selected = false;
            menuList[1].selected = true;
            testRender(DOM, menuList);
        });

        it('does\'t do anything when moved down if bottom element is selected', function() {
            DOM.watchListener({data:'down-button:click'});
            testRender(DOM, menuList);
        });

        it('moves up', function() {
            DOM.watchListener({data:'up-button:click'});
            menuList[0].selected = true;
            menuList[1].selected = false;
            testRender(DOM, menuList);
        });

        it('unmounts', function() {
            DOM.componentWillUnmount();
        });
    });

    it('has a on selected callback', function() {
        var menuList = [{text: 'Menu item 1'}, {text: 'Menu Item 2', selected:true, someExtraValue: 3}];
        var SelectionList = require('../../utils/SelectionList');
        SelectionList.getSelected.mockReturnValue(menuList[1]);
        var ListMenu = require('../ListMenu.react.jsx');
        var onSelect = jest.genMockFunction();
        var DOM = TestUtils.renderIntoDocument(<ListMenu items={menuList} onSelect={onSelect }/>);
        DOM.watchListener({data:'middle-button:click'});
        expect(SelectionList.getSelected).toBeCalledWith(menuList);
        expect(onSelect).toBeCalledWith(menuList[1]);
        DOM.componentWillUnmount();
    });
});
