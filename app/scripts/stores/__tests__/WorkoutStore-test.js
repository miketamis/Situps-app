jest.dontMock('../WorkoutStore');
jest.dontMock('object-assign');

describe('TodoStore', function() {

    var AppDispatcher;
    var WorkoutStore;
    var callback;
    var listener;
    var workoutGenerator;
    var SelectionList;


    var setAge = {
        actionType: 'setAge',
        age: 1
    };

    var calculateLevel = {
        actionType: 'calculateLevel',
        amount: 1
    };

    var finishWorkout = {
        actionType: 'finishWorkout',
        levelChange: 1
    };

    var workout = [
        {type: 'situps', amount: 10, selected: true},
        {type: 'rest', amount: 20},
        {type: 'situps', amount: 30},
        {type: 'rest', amount: 40},
        {type: 'situps', amount: 50},
        {type: 'rest', amount: 60},
        {type: 'situps', amount: 70}
    ];


    function calbackAction(action) {
        callback({
            actionType: action
        });
    }


    beforeEach(function() {
        window.localStorage = {
            getItem: jest.genMockFunction(),
            setItem: jest.genMockFunction(),
            clear: jest.genMockFunction(),
            removeItem: jest.genMockFunction()
        };
        AppDispatcher = require('../../dispatcher/AppDispatcher');
        WorkoutStore = require('../WorkoutStore');
        workoutGenerator = require('../../utils/WorkoutGenerator');
        SelectionList = require('../../utils/SelectionList');
        callback = AppDispatcher.register.mock.calls[0][0];
        listener = jest.genMockFunction();
        WorkoutStore.addChangeListener(listener);
    });

    afterEach(function() {
        WorkoutStore.removeChangeListener(listener);
    });

    it('registers a callback with the dispatcher', function() {
        expect(AppDispatcher.register.mock.calls.length).toBe(1);
    });

    it('it doesn\'t crash when a random action is dispatch', function() {
        callback({awesome: 'is so awesome'});
    });

    it('It starts blank', function() {
        expect(WorkoutStore.getCurrentSitup).toThrow('No Level');
        expect(WorkoutStore.getCurrentRest).toThrow('No Level');
        expect(WorkoutStore.getWorkout).toThrow('No Level');
        expect(WorkoutStore.onFirst).toThrow('No Level');
        expect(WorkoutStore.onLast).toThrow('No Level');
        expect(WorkoutStore.getCurrentType).toThrow('No Level');
        expect(WorkoutStore.hasLevelData()).not.toBeTruthy();
        expect(WorkoutStore.hasAgeData()).not.toBeTruthy();
    });

    it('You can set the set the age', function() {
        window.localStorage.getItem.mockImplementation(function(item) {
            if (item === 'age') {
                return 1;
            }
        });
        callback(setAge);
        expect(WorkoutStore.getCurrentSitup).toThrow('No Level');
        expect(WorkoutStore.getCurrentRest).toThrow('No Level');
        expect(WorkoutStore.getWorkout).toThrow('No Level');
        expect(WorkoutStore.onFirst).toThrow('No Level');
        expect(WorkoutStore.onLast).toThrow('No Level');
        expect(WorkoutStore.getCurrentType).toThrow('No Level');
        expect(WorkoutStore.hasLevelData()).not.toBeTruthy();
        expect(WorkoutStore.hasAgeData()).toBeTruthy();
    });

    it('if age is bad in localstorage it throws error', function() {
        window.localStorage.getItem.mockImplementation(function(item) {
            if(item === 'level') {
                return 10;
            } else if (item === 'age') {
                return 'BAD';
            }
        });
        expect(WorkoutStore.getCurrentSitup).toThrow('No Age');
        expect(WorkoutStore.getCurrentRest).toThrow('No Age');
        expect(WorkoutStore.getWorkout).toThrow('No Age');
        expect(WorkoutStore.onFirst).toThrow('No Age');
        expect(WorkoutStore.onLast).toThrow('No Age');
        expect(WorkoutStore.getCurrentType).toThrow('No Age');
    });

    it('You cant set the age to a invalid value', function() {
        var invalid_ages = ['Hello', -1, 3, 1.5];
        invalid_ages.forEach(function(age) {
            expect(function() {
                setAge.age = age;
                callback(setAge);
            }).toThrow('Invalid Age');
            expect(WorkoutStore.hasAgeData()).not.toBeTruthy();
        });
    });

    var set_age_and_calculate_level = function() {
        workoutGenerator.calculateLevel.mockImplementation(function() {
            return 10;
        });

        SelectionList.getSelected.mockImplementation(function() {
            return workout[0];
        });

        workoutGenerator.generateWorkout.mockImplementation(function() {
            return workout;
        });

        window.localStorage.getItem.mockImplementation(function(item) {
            if(item === 'level') {
                return 10;
            } else if (item === 'age') {
                return 2;
            }
        });


        setAge.age = 2;
        callback(setAge);
        callback(calculateLevel);
        expect(window.localStorage.setItem).toBeCalledWith('level', 10);
        expect(WorkoutStore.hasLevelData()).toBeTruthy();
        expect(WorkoutStore.hasAgeData()).toBeTruthy();
        expect(workoutGenerator.calculateLevel).toBeCalledWith(calculateLevel.amount, setAge.age);
        expect(WorkoutStore.onFirst()).toBeTruthy();
        expect(WorkoutStore.onLast()).not.toBeTruthy();
        expect(WorkoutStore.getCurrentType()).toBe('situps');
        expect(SelectionList.getSelected).toBeCalledWith(workout);
        expect(WorkoutStore.getCurrentRest).toThrow('current step isn\'t rest');
        expect(WorkoutStore.getCurrentSitup()).toBe(10);
        expect(WorkoutStore.getWorkout()).toBe(workout);
        expect(workoutGenerator.generateWorkout.mock.calls.length).toBe(1);
        expect(window.localStorage.clear).not.toBeCalled();
        expect(window.localStorage.removeItem).not.toBeCalled();
    };

    it('Calculates the level', set_age_and_calculate_level);

    it('you can go to the next workout', function() {
        set_age_and_calculate_level();
        calbackAction('nextRep');
        expect(SelectionList.moveDown).toBeCalled();
        expect(SelectionList.moveUp).not.toBeCalled();
    });

    it('you can go to the next workout', function() {
        set_age_and_calculate_level();
        calbackAction('previousRep');
        expect(SelectionList.moveDown).not.toBeCalled();
        expect(SelectionList.moveUp).toBeCalled();
    });

    it('FinishWorkout increments the level', function() {
        set_age_and_calculate_level();
        callback(finishWorkout);
        expect(window.localStorage.setItem).lastCalledWith('level', 11);
        expect(workoutGenerator.generateWorkout.mock.calls.length).toBe(2);
    });

    it('FinishWorkout does do anything if the increment is 0', function() {
        set_age_and_calculate_level();
        finishWorkout.levelChange = 0;
        callback(finishWorkout);
        expect(workoutGenerator.generateWorkout.mock.calls.length).toBe(1);
    });

    it('Cancel workout regenerates workout', function() {
        set_age_and_calculate_level();
        calbackAction('cancelWorkout');
        expect(workoutGenerator.generateWorkout.mock.calls.length).toBe(2);
    });

    it('Reset Age clears localStorage', function() {
        set_age_and_calculate_level();
        calbackAction('resetAge');
        expect(window.localStorage.clear).toBeCalled();
    });

    it('resetData clears localStorage', function() {
        set_age_and_calculate_level();
        calbackAction('resetData');
        expect(window.localStorage.clear).toBeCalled();
    });

    it('resetLevel clears level data', function() {
        set_age_and_calculate_level();
        calbackAction('resetLevel');
        expect(window.localStorage.clear).not.toBeCalled();
        expect(window.localStorage.removeItem).toBeCalledWith('level');
    });

});
