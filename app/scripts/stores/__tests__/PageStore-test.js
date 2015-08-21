jest.dontMock('../PageStore');
jest.dontMock('object-assign');

describe('TodoStore', function() {

    var AppDispatcher;
    var PageStore;
    var callback;

    beforeEach(function() {
        AppDispatcher = require('../../dispatcher/AppDispatcher');
        PageStore = require('../PageStore');
        callback = AppDispatcher.register.mock.calls[0][0];
    });

    it('registers a callback with the dispatcher', function() {
        expect(AppDispatcher.register.mock.calls.length).toBe(1);
    });
});
