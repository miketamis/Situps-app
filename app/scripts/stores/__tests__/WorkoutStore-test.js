jest.dontMock('../WorkoutStore');
jest.dontMock('object-assign');

describe('TodoStore', function() {

    var AppDispatcher;
    var WorkoutStore;
    var callback;
    var listener;

    beforeEach(function() {
        AppDispatcher = require('../../dispatcher/AppDispatcher');
        WorkoutStore = require('../WorkoutStore');
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
});
