jest.dontMock('../TriOptions.react.jsx');
jest.dontMock('classnames');

describe('TriOptions', function () {
    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    it('renders', function() {
        var TriOptions = require('../TriOptions.react.jsx');
        var shallowRenderer = TestUtils.createRenderer();
        shallowRenderer.render(<TriOptions optionOne = 'A' optionTwo = 'B' optionThree = 'C'/>);
        var rendered = shallowRenderer.getRenderOutput().props.children;
        expect(rendered[0].props).toEqual({ className: 'tri-option', position: 'top', value: 'A' });
        expect(rendered[1].props).toEqual({ className: 'tri-option', position: 'middle', value: 'B' });
        expect(rendered[2].props).toEqual({ className: 'tri-option', position: 'bottom', value: 'C' });
    });

    it('Throw error if no input is given', function() {
        var TriOptions = require('../TriOptions.react.jsx');
        var shallowRenderer = TestUtils.createRenderer();
        expect(function() {
            shallowRenderer.render(<TriOptions  optionTwo = 'B' optionThree = 'C'/>);
        }).toThrow('optionOne must be defined');

        expect(function() {
            shallowRenderer.render(<TriOptions optionOne = 'A' optionThree = 'C'/>);
        }).toThrow('optionTwo must be defined');

        expect(function() {
            shallowRenderer.render(<TriOptions optionOne = 'A' optionTwo = 'B'/>);
        }).toThrow('optionThree must be defined');
    });
});
