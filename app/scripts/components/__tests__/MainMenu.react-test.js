jest.dontMock('../MainMenu.react.jsx');
jest.dontMock('classnames');

describe('MainMenu', function () {
    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    it('It goes back', function() {
        var MainMenu = require('../MainMenu.react.jsx');
        var standardActions = require('../../actions/standardActions');
        var DOM = TestUtils.renderIntoDocument(<MainMenu/>);
        DOM.watchListener({data:'back-button:click'});
        expect(standardActions.goBack).toBeCalled();
        DOM.componentWillUnmount();
    });

    it('On select changes the page', function() {
        var MainMenu = require('../MainMenu.react.jsx');
        var standardActions = require('../../actions/standardActions');
        var DOM = TestUtils.renderIntoDocument(<MainMenu/>);
        DOM.onSelect({text: 'Hello'});
        expect(standardActions.optionSelected).toBeCalledWith('Hello');
        DOM.componentWillUnmount();
    });
});
