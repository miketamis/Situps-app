jest.dontMock('../SitupApp.react.jsx');
jest.dontMock('classnames');
jest.dontMock('object-assign');

describe('SitupApp', function () {
    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    it('Each page takes you to the correct one', function() {
        var SitupApp = require('../SitupApp.react.jsx');
        var PageStore = require('../../stores/PageStore');
        var WorkoutStore = require('../../stores/WorkoutStore');
        var shallowRenderer = TestUtils.createRenderer();
        PageStore.getPage.mockReturnValue('MainMenu');
        shallowRenderer.render(<SitupApp/>);
        var instance = shallowRenderer._instance._instance;
        expect(shallowRenderer.getRenderOutput().props.children.type.displayName).toBe('MainMenu');

        PageStore.getPage.mockReturnValue('Start');
        instance._onChange();
        expect(shallowRenderer.getRenderOutput().props.children.type.displayName).toBe('WorkoutScreen');

        PageStore.getPage.mockReturnValue('Done');
        instance._onChange();
        expect(shallowRenderer.getRenderOutput().props.children.type.displayName).toBe('DoneScreen');

        PageStore.getPage.mockReturnValue('Welcome');
        instance._onChange();
        expect(shallowRenderer.getRenderOutput().props.children.type.displayName).toBe('WelcomeScreen');

        PageStore.getPage.mockReturnValue('Setup');
        WorkoutStore.hasAgeData.mockReturnValue(false);
        instance._onChange();
        expect(shallowRenderer.getRenderOutput().props.children.type.displayName).toBe('AgeScreen');

        PageStore.getPage.mockReturnValue('Setup');
        WorkoutStore.hasAgeData.mockReturnValue(true);
        instance._onChange();
        expect(shallowRenderer.getRenderOutput().props.children.type.displayName).toBe('InitialTest');

        PageStore.getPage.mockReturnValue('Setting');
        instance._onChange();
        expect(shallowRenderer.getRenderOutput().props.children.type.displayName).toBe('SettingScreen');

        expect(function() {
            PageStore.getPage.mockReturnValue('Test');
            instance._onChange();
        }).toThrow('No page called: Test');

    });

    it('Mounts and unmounts', function() {
        var PageStore = require('../../stores/PageStore');
        var SitupApp = require('../SitupApp.react.jsx');
        PageStore.getPage.mockReturnValue('Setting');
        var DOM = TestUtils.renderIntoDocument(<SitupApp/>);
        DOM.componentWillUnmount();
    });
});
