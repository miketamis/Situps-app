jest.dontMock('../PageStore');
jest.dontMock('object-assign');

describe('TodoStore', function() {

    var AppDispatcher;
    var PageStore;
    var callback;
    var listener;

    var optionSelected = {
        actionType: 'optionSelected',
        Option: 'ROOM NAME HERE'
    };

    var setPage = {
        actionType: 'setPage',
        page: 'PAGE NAME HERE'
    };


    function calbackAction(action) {
        callback({
            actionType: action
        });
    }


    beforeEach(function() {
        AppDispatcher = require('../../dispatcher/AppDispatcher');
        PageStore = require('../PageStore');
        callback = AppDispatcher.register.mock.calls[0][0];
        listener = jest.genMockFunction();
        PageStore.addChangeListener(listener);
    });

    afterEach(function() {
        PageStore.removeChangeListener(listener);
    });

    function addSeveralRooms() {
        optionSelected.Option = 'ROOM1';
        callback(optionSelected);
        expect(PageStore.getPage()).toBe('ROOM1');
        expect(listener).toBeCalled();
        optionSelected.Option = 'ROOM2';
        callback(optionSelected);
        expect(PageStore.getPage()).toBe('ROOM2');
    }

    function emptyStackQuit() {
        window.alert =  jest.genMockFunction();
        calbackAction('goBack');
        expect(window.alert).toBeCalledWith('Quit');
    }

    it('registers a callback with the dispatcher', function() {
        expect(AppDispatcher.register.mock.calls.length).toBe(1);
    });

    it('it doesn\'t crash when a random action is dispatch', function() {
        callback({awesome: 'is so awesome'});
    });

    it('Quits if nothing is left on the stack', emptyStackQuit);

    it('initialise with Main Menu', function() {
        expect(PageStore.getPage()).toBe('MainMenu');
        emptyStackQuit();
        expect(listener).toBeCalled();
    });

    it('It can add serveral rooms', addSeveralRooms);

    it('Can go back', function() {
        addSeveralRooms();
        calbackAction('goBack');
        expect(PageStore.getPage()).toBe('ROOM1');
        expect(listener).toBeCalled();
    });

    it('finishWorkout takes you home', function() {
        addSeveralRooms();
        calbackAction('finishWorkout');
        expect(PageStore.getPage()).toBe('MainMenu');
        expect(listener).toBeCalled();
    });

    it('calculateLevel takes you to mainMenu but doesnt destroy stack', function() {
        addSeveralRooms();
        calbackAction('calculateLevel');
        expect(listener).toBeCalled();
        expect(PageStore.getPage()).toBe('MainMenu');
        calbackAction('goBack');
        expect(PageStore.getPage()).toBe('ROOM2');
    });

    it('when there is a data reset it takes you to welcome screen', function() {
        calbackAction('resetData');
        expect(listener).toBeCalled();
        expect(PageStore.getPage()).toBe('Welcome');
        emptyStackQuit();
    });

    it('setPage sets the page with no history', function() {
        setPage.page = 'awesome page';
        callback(setPage);
        expect(listener).toBeCalled();
        expect(PageStore.getPage()).toBe('awesome page');
        emptyStackQuit();
    });

    it('will take you back when workout canceled', function() {
        addSeveralRooms();
        calbackAction('cancelWorkout');
        expect(PageStore.getPage()).toBe('ROOM1');
        expect(listener).toBeCalled();
    });


});
