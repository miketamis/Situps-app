jest.dontMock('../DoneScreen.react.jsx');
jest.dontMock('classnames');

describe('DoneScreen', function () {
    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    it('It goes back', function() {
        var DoneScreen = require('../DoneScreen.react.jsx');
        var standardActions = require('../../actions/standardActions');
        var DOM = TestUtils.renderIntoDocument(<DoneScreen/>);
        DOM.watchListener({data:'back-button:click'});
        expect(standardActions.goBack).toBeCalled();
        expect(standardActions.finishWorkout).not.toBeCalled();
        DOM.componentWillUnmount();
    });

    it('It goes up a level', function() {
        var DoneScreen = require('../DoneScreen.react.jsx');
        var standardActions = require('../../actions/standardActions');
        var DOM = TestUtils.renderIntoDocument(<DoneScreen/>);
        DOM.watchListener({data:'up-button:click'});
        expect(standardActions.goBack).not.toBeCalled();
        expect(standardActions.finishWorkout).toBeCalledWith(1);
        DOM.componentWillUnmount();
    });

    it('stays the same level', function() {
        var DoneScreen = require('../DoneScreen.react.jsx');
        var standardActions = require('../../actions/standardActions');
        var DOM = TestUtils.renderIntoDocument(<DoneScreen/>);
        DOM.watchListener({data:'middle-button:click'});
        expect(standardActions.goBack).not.toBeCalled();
        expect(standardActions.finishWorkout).toBeCalledWith(0);
        DOM.componentWillUnmount();
    });

    it('It goes down a level', function() {
        var DoneScreen = require('../DoneScreen.react.jsx');
        var standardActions = require('../../actions/standardActions');
        var DOM = TestUtils.renderIntoDocument(<DoneScreen/>);
        DOM.watchListener({data:'down-button:click'});
        expect(standardActions.goBack).not.toBeCalled();
        expect(standardActions.finishWorkout).toBeCalledWith(-1);
        DOM.componentWillUnmount();
    });
});
