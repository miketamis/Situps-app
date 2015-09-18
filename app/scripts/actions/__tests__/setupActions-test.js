jest.dontMock('../setupActions');
jest.dontMock('object-assign');

describe('SetupActions', function() {
    var AppDispatcher = require('../../dispatcher/AppDispatcher');
    var setupActions = require('../setupActions');
    it('sets age', function() {
        setupActions.setAge(10);
        expect(AppDispatcher.dispatch).toBeCalledWith({
            actionType: 'setAge',
            age: 10
        });
    });

    it('reset Data', function() {
        setupActions.resetData();
        expect(AppDispatcher.dispatch).toBeCalledWith({
            actionType: 'resetData'
        });
    });

    it('reset Age', function() {
        setupActions.resetAge();
        expect(AppDispatcher.dispatch).toBeCalledWith({
            actionType: 'resetAge'
        });
    });

    it('reset Level', function() {
        setupActions.resetLevel();
        expect(AppDispatcher.dispatch).toBeCalledWith({
            actionType: 'resetLevel'
        });
    });

    it('calculates Level', function() {
        setupActions.calculateLevel(20);
        expect(AppDispatcher.dispatch).toBeCalledWith({
            actionType: 'calculateLevel',
            amount: 20
        });
    });

});
