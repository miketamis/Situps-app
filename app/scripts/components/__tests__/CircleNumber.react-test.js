jest.dontMock('../CircleNumber.react.jsx');
jest.dontMock('classnames');

describe('CircleNumber', function () {
    var React = require('react/addons');
    it('should render', function() {
        var CircleNumber = require('../CircleNumber.react.jsx');
        var html = React.renderToStaticMarkup(< CircleNumber value={4}/>);
        expect(html).toBe('<div class="circle">4</div>');
    });
    
    it('should fail if value is assigned', function() {
        var CircleNumber = require('../CircleNumber.react.jsx');
        expect(function() {
            React.renderToStaticMarkup(< CircleNumber />);
        }).toThrow('Value must be defined');
    });
});
