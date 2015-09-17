jest.dontMock('../ProgressBar.react.jsx');
jest.dontMock('classnames');
jest.dontMock('object-assign');

describe('ProgressBar', function () {
    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;

    var workout = [
        {type: 'situps', amount: 10, selected: true},
        {type: 'rest', amount: 20},
        {type: 'situps', amount: 30},
        {type: 'rest', amount: 40},
        {type: 'situps', amount: 50},
        {type: 'rest', amount: 60},
        {type: 'situps', amount: 70}
    ];

    it('it renders', function() {
        var ProgressBar = require('../ProgressBar.react.jsx');
        var WorkoutStore = require('../../stores/WorkoutStore');
        WorkoutStore.getWorkout.mockImplementation(function() {
            return workout;
        });
        var html = React.renderToStaticMarkup(
            <ProgressBar />
        );
        expect(html).toBe('<div class="progress-bar">❶▹➁▹➂▹➃</div>');
    });

    it('renders with rest highlighted', function() {
        var ProgressBar = require('../ProgressBar.react.jsx');
        var WorkoutStore = require('../../stores/WorkoutStore');
        workout[0].selected = false;
        workout[1].selected = true;
        WorkoutStore.getWorkout.mockImplementation(function() {
            return workout;
        });
        var html = React.renderToStaticMarkup(
            <ProgressBar />
        );
        expect(html).toBe('<div class="progress-bar">➀▸➁▹➂▹➃</div>');
    });

    it('renders with 2 workout rest highlighted', function() {
        var ProgressBar = require('../ProgressBar.react.jsx');
        var WorkoutStore = require('../../stores/WorkoutStore');
        workout[1].selected = false;
        workout[2].selected = true;
        WorkoutStore.getWorkout.mockImplementation(function() {
            return workout;
        });
        var html = React.renderToStaticMarkup(
            <ProgressBar />
        );
        expect(html).toBe('<div class="progress-bar">➀▹❷▹➂▹➃</div>');
    });

    it('Would render a larger workout', function() {
        workout.push({type: 'rest', amount: 60});
        workout.push({type: 'situps', amount: 70});
        var ProgressBar = require('../ProgressBar.react.jsx');
        var WorkoutStore = require('../../stores/WorkoutStore');
        workout[1].selected = false;
        workout[2].selected = true;
        WorkoutStore.getWorkout.mockImplementation(function() {
            return workout;
        });
        var html = React.renderToStaticMarkup(
            <ProgressBar />
        );
        expect(html).toBe('<div class="progress-bar">➀▹❷▹➂▹➃▹➄</div>');
    });

    it('Mounts and unmount', function() {
        var WorkoutStore = require('../../stores/WorkoutStore');
        var ProgressBar = require('../ProgressBar.react.jsx');
        WorkoutStore.getWorkout.mockImplementation(function() {
            return workout;
        });

        var DOM = TestUtils.renderIntoDocument(<ProgressBar/>);
        DOM._onChange();
        DOM.componentWillUnmount();
    });

});
