jest.dontMock('../RestScreen.react.jsx');
jest.dontMock('classnames');
jest.dontMock('object-assign');

describe('RestScreen', function () {
    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    it('It generates style that gives pi chart effect', function() {
        var RestScreen = require('../RestScreen.react.jsx');
        var DOM = TestUtils.renderIntoDocument(<RestScreen/>);
        expect(DOM.generateStyle(10).backgroundImage).toBe(
            'linear-gradient(90deg, white 50%, transparent 50%, transparent), ' +
            'linear-gradient(100deg, tomato 50%, white 50%, white)'
        );
        expect(DOM.generateStyle(50).backgroundImage).toBe(
            'linear-gradient(90deg, white 50%, transparent 50%, transparent), ' +
            'linear-gradient(140deg, tomato 50%, white 50%, white)'
        );
        expect(DOM.generateStyle(180).backgroundImage).toBe(
            'linear-gradient(90deg, white 50%, transparent 50%, transparent), ' +
            'linear-gradient(270deg, tomato 50%, white 50%, white)'
        );
        expect(DOM.generateStyle(270).backgroundImage).toBe(
            'linear-gradient(0deg, tomato 50%, transparent 50%, transparent), ' +
            'linear-gradient(270deg, tomato 50%, white 50%, white)'
        );
    });

    it('Tick function decress time remaining', function() {
        var RestScreen = require('../RestScreen.react.jsx');
        var WorkoutStore = require('../../stores/WorkoutStore');
        WorkoutStore.getCurrentRest.mockReturnValue(10);
        var shallowRenderer = TestUtils.createRenderer();
        shallowRenderer.render(<RestScreen/>);
        var standardActions = require('../../actions/standardActions');

        for(var i = 9; i > 0; i--) {
            shallowRenderer._instance._instance.tick();
            var component = shallowRenderer.getRenderOutput();
            expect(component.props.children[1].props.children[1].props.value).toEqual(i);
        }
        expect(standardActions.nextRep).not.toBeCalled();
        shallowRenderer._instance._instance.tick();
        expect(standardActions.nextRep).toBeCalled();
    });

    it('Mounts and unmounts', function() {
        expect(setInterval.mock.calls.length).toBe(0);
        expect(clearInterval.mock.calls.length).toBe(0);
        var RestScreen = require('../RestScreen.react.jsx');
        var DOM = TestUtils.renderIntoDocument(<RestScreen/>);
            expect(clearInterval.mock.calls.length).toBe(0);
        expect(setInterval.mock.calls.length).toBe(1);
        expect(setInterval.mock.calls[0][1]).toBe(1000);
        DOM.componentWillUnmount();
            expect(clearInterval.mock.calls.length).toBe(1);
    });
});
