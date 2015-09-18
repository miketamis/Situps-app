jest.dontMock('../standardActions');
jest.dontMock('object-assign');

describe('standardActions', function() {
    var AppDispatcher = require('../../dispatcher/AppDispatcher');
    var standardActions = require('../standardActions');
    it('adds page location', function() {
        standardActions.optionSelected('Home');
        expect(AppDispatcher.dispatch).toBeCalledWith({
            actionType: 'optionSelected',
            Option: 'Home'
        });
    });

    it('sets page location', function() {
        standardActions.setPage('Home');
        expect(AppDispatcher.dispatch).toBeCalledWith({
            actionType: 'setPage',
            page: 'Home'
        });
    });

    it('goes to next rep', function() {
        standardActions.nextRep();
        expect(AppDispatcher.dispatch).toBeCalledWith({
            actionType: 'nextRep'
        });
    });

    it('goes to previousRep rep', function() {
        standardActions.previousRep();
        expect(AppDispatcher.dispatch).toBeCalledWith({
            actionType: 'previousRep'
        });
    });

    it('cancel Workout', function() {
        standardActions.cancelWorkout();
        expect(AppDispatcher.dispatch).toBeCalledWith({
            actionType: 'cancelWorkout'
        });
    });

    it('goes Back', function() {
        standardActions.goBack();
        expect(AppDispatcher.dispatch).toBeCalledWith({
            actionType: 'goBack'
        });
    });

    it('finish Workout', function() {
        standardActions.finishWorkout(1);
        expect(AppDispatcher.dispatch).toBeCalledWith({
            actionType: 'finishWorkout',
            levelChange: 1
        });
    });

    it('can finish Workout with no arguement', function() {
        standardActions.finishWorkout();
        expect(AppDispatcher.dispatch).toBeCalledWith({
            actionType: 'finishWorkout',
            levelChange: 0
        });
    });
});
