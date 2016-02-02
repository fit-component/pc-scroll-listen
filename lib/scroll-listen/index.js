'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

require('./index.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScrollListen = function (_React$Component) {
    _inherits(ScrollListen, _React$Component);

    function ScrollListen(props) {
        _classCallCheck(this, ScrollListen);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ScrollListen).call(this, props));
    }

    _createClass(ScrollListen, [{
        key: 'handleClick',
        value: function handleClick(value) {
            this.props.onChange(value);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var Children = this.props.titles.map(function (item, index) {
                var itemClass = (0, _classnames2.default)({
                    item: true,
                    active: _this2.props.activeKey === item.key
                });
                return _react2.default.createElement(
                    'div',
                    { key: index,
                        onClick: _this2.handleClick.bind(_this2, item.key),
                        className: itemClass },
                    item.name
                );
            });

            return _react2.default.createElement(
                'div',
                { className: 'lib-pc-scroll-listen-lib-scroll-listen' },
                Children
            );
        }
    }]);

    return ScrollListen;
}(_react2.default.Component);

exports.default = ScrollListen;

ScrollListen.defaultProps = {
    // @desc title数组
    titles: [],

    // @desc 点击选择的回调
    onChange: function onChange() {},

    // @desc 当前激活的key
    activeKey: ''
};