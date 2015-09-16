jest.dontMock('../Hint.react.jsx');
jest.dontMock('classnames');

describe('Hint', function () {
    var React = require('react/addons');

    it('should render', function() {
        var Hint = require('../Hint.react.jsx');
        var html = React.renderToStaticMarkup(
            < Hint value='next' position='top' className='Hello'/>
        );
        expect(html).toBe('<div class="Hello hint top">next</div>');
    });

    it('should fail if value isnt assigned', function() {
        var Hint = require('../Hint.react.jsx');
        expect(function() {
            React.renderToStaticMarkup(< Hint position='bottom'/>);
        }).toThrow('Value must be defined');
    });

    it('should fail if possition isnt valid', function() {
        var Hint = require('../Hint.react.jsx');
        expect(function() {
            React.renderToStaticMarkup(< Hint value='MY HINT' position = 'awesome'/>);
        }).toThrow('position must be one of top, middle or bottom');
    });
});
