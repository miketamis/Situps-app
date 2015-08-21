jest.dontMock('../WorkoutStore');
jest.dontMock('object-assign');

describe('TodoStore', function() {

    var AppDispatcher;
    var WorkoutStore;
    var callback;

    beforeEach(function() {
        AppDispatcher = require('../../dispatcher/AppDispatcher');
        WorkoutStore = require('../WorkoutStore');
        callback = AppDispatcher.register.mock.calls[0][0];
    });

    it('registers a callback with the dispatcher', function() {
        expect(AppDispatcher.register.mock.calls.length).toBe(1);
    });
});
