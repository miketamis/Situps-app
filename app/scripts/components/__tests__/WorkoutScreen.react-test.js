jest.dontMock('../WorkoutScreen.react.jsx');
jest.dontMock('classnames');
jest.dontMock('object-assign');

describe('WorkoutScreen', function () {
    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    it('Renders', function() {
        var WorkoutScreen = require('../WorkoutScreen.react.jsx');
        var WorkoutStore = require('../../stores/WorkoutStore');
        WorkoutStore.getCurrentType.mockReturnValue('situps');
        var shallowRenderer = TestUtils.createRenderer();
        shallowRenderer.render(<WorkoutScreen/>);
        var rendered = shallowRenderer.getRenderOutput().props.children;
        expect(rendered[1].type.displayName).toBe('SitupScreen');
        WorkoutStore.getCurrentType.mockReturnValue('rest');
        shallowRenderer._instance._instance._onChange();
        rendered = shallowRenderer.getRenderOutput().props.children;
        expect(rendered[1].type.displayName).toBe('RestScreen');
    });

    it('Goes back a workout', function() {
        var WorkoutScreen = require('../WorkoutScreen.react.jsx');
        var WorkoutStore = require('../../stores/WorkoutStore');
        var standardActions = require('../../actions/standardActions');
        WorkoutStore.getCurrentType.mockReturnValue('situps');
        WorkoutStore.onFirst.mockReturnValue(false);
        var DOM = TestUtils.renderIntoDocument(<WorkoutScreen/>);
        expect(standardActions.previousRep).not.toBeCalled();
        DOM.watchListener({data: 'back-button:click'});
        expect(standardActions.previousRep).toBeCalled();
        DOM.componentWillUnmount();
    });

    it('quits if on firstworkout', function() {
        var WorkoutScreen = require('../WorkoutScreen.react.jsx');
        var WorkoutStore = require('../../stores/WorkoutStore');
        var standardActions = require('../../actions/standardActions');
        WorkoutStore.getCurrentType.mockReturnValue('situps');
        WorkoutStore.onFirst.mockReturnValue(true);
        var DOM = TestUtils.renderIntoDocument(<WorkoutScreen/>);
        expect(standardActions.cancelWorkout).not.toBeCalled();
        DOM.watchListener({data: 'back-button:click'});
        expect(standardActions.previousRep).not.toBeCalled();
        expect(standardActions.cancelWorkout).toBeCalled();
        DOM.componentWillUnmount();
    });

    it('Goes foward a workout', function() {
        var WorkoutScreen = require('../WorkoutScreen.react.jsx');
        var WorkoutStore = require('../../stores/WorkoutStore');
        var standardActions = require('../../actions/standardActions');
        WorkoutStore.getCurrentType.mockReturnValue('situps');
        WorkoutStore.onLast.mockReturnValue(false);
        var DOM = TestUtils.renderIntoDocument(<WorkoutScreen/>);
        expect(standardActions.nextRep).not.toBeCalled();
        DOM.watchListener({data: 'middle-button:click'});
        expect(standardActions.nextRep).toBeCalled();
        DOM.componentWillUnmount();
    });

    it('quits if on firstworkout', function() {
        var WorkoutScreen = require('../WorkoutScreen.react.jsx');
        var WorkoutStore = require('../../stores/WorkoutStore');
        var standardActions = require('../../actions/standardActions');
        WorkoutStore.getCurrentType.mockReturnValue('situps');
        WorkoutStore.onLast.mockReturnValue(true);
        var DOM = TestUtils.renderIntoDocument(<WorkoutScreen/>);
        expect(standardActions.optionSelected).not.toBeCalled();
        DOM.watchListener({data: 'middle-button:click'});
        expect(standardActions.nextRep).not.toBeCalled();
        expect(standardActions.optionSelected).toBeCalledWith('Done');
        DOM.componentWillUnmount();
    });
});
