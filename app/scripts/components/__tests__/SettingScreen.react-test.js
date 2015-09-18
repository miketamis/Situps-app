jest.dontMock('../SettingScreen.react.jsx');
jest.dontMock('classnames');

describe('SettingScreen', function () {
    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    it('It goes back', function() {
        var SettingScreen = require('../SettingScreen.react.jsx');
        var standardActions = require('../../actions/standardActions');
        var DOM = TestUtils.renderIntoDocument(<SettingScreen/>);
        DOM.watchListener({data:'back-button:click'});
        expect(standardActions.goBack).toBeCalled();
        DOM.componentWillUnmount();
    });

    it('Reset, resets the data', function() {
        var SettingScreen = require('../SettingScreen.react.jsx');
        var setupActions = require('../../actions/setupActions');
        var DOM = TestUtils.renderIntoDocument(<SettingScreen/>);
        expect(setupActions.resetData).not.toBeCalled();
        DOM.onSelect({text: 'Reset'});
        expect(setupActions.resetData).toBeCalled();
        DOM.componentWillUnmount();
    });

    it('The wrong onselect does nothing', function() {
        var SettingScreen = require('../SettingScreen.react.jsx');
        var setupActions = require('../../actions/setupActions');
        var DOM = TestUtils.renderIntoDocument(<SettingScreen/>);
        expect(setupActions.resetData).not.toBeCalled();
        DOM.onSelect({text: 'NotReset'});
        expect(setupActions.resetData).not.toBeCalled();
        DOM.componentWillUnmount();
    });
});
