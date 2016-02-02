'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScrollListenBox = function (_React$Component) {
    _inherits(ScrollListenBox, _React$Component);

    function ScrollListenBox(props) {
        _classCallCheck(this, ScrollListenBox);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ScrollListenBox).call(this, props));

        _this.state = {
            nailArray: []
        };
        return _this;
    }

    _createClass(ScrollListenBox, [{
        key: 'handleScroll',
        value: function handleScroll() {
            var _this2 = this;

            var newNailArray = _extends([], this.state.nailArray);
            var domTop = this.$scrollSelf.offset().top;
            var scrollTop = this.$scrollSelf.scrollTop();
            newNailArray.sort(function (left, right) {
                return left.top > right.top;
            });

            var topIndex = -1;
            var currentKey = '';
            newNailArray.map(function (item) {
                if (scrollTop > item.top - domTop - _this2.$scrollParent.scrollTop() - 1) {
                    if (topIndex === 1) return;
                    topIndex = 0;
                    currentKey = item.key;
                } else {
                    if (topIndex === 0) {
                        topIndex = 1;
                    }
                }
            });

            // 默认取第一个
            if (currentKey === '' && newNailArray.length > 0) {
                currentKey = newNailArray[0].key;
            }

            this.props.onScrollKeyChange && this.props.onScrollKeyChange(currentKey);
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.dom = _reactDom2.default.findDOMNode(this);
            this.$dom = (0, _jquery2.default)(this.dom);
            this.$scrollSelf = (0, _jquery2.default)(this.getScrollSelf());
            this.$scrollParent = (0, _jquery2.default)(this.getScrollParent());
            this.$scrollSelf.on('scroll', this.handleScroll.bind(this));
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.$scrollSelf.off('scroll', this.handleScroll.bind(this));
        }
    }, {
        key: 'getScrollSelf',
        value: function getScrollSelf() {
            var el = _reactDom2.default.findDOMNode(this);
            do {
                switch (window.getComputedStyle(el)['overflowY']) {
                    case 'auto':
                    case 'scroll':
                    case 'overlay':
                        return el;
                }
            } while (el = el.parentElement);

            return window;
        }
    }, {
        key: 'getScrollParent',
        value: function getScrollParent() {
            var el = _reactDom2.default.findDOMNode(this);
            while (el = el.parentElement) {
                switch (window.getComputedStyle(el)['overflowY']) {
                    case 'auto':
                    case 'scroll':
                    case 'overlay':
                        return el;
                }
            }

            return window;
        }
    }, {
        key: 'handleNailRender',
        value: function handleNailRender(key, top) {
            var newNailArray = this.state.nailArray;
            newNailArray.push({
                key: key,
                top: top
            });
            this.setState({
                nailArray: newNailArray
            });
        }

        // 手动切换滑动

    }, {
        key: 'scrollTo',
        value: function scrollTo(key) {
            var _this3 = this;

            this.state.nailArray.map(function (item) {
                if (key === item.key) {
                    _this3.$dom.animate({
                        scrollTop: item.top - _this3.$dom.offset().top - _this3.$scrollParent.scrollTop()
                    }, 200);
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var Children = _react2.default.Children.map(this.props.children, function (item) {
                var props = _extends({}, item.props);
                if (item.type.name === 'ScrollListenNail') {
                    _this4.props.titles.map(function (titleItem) {
                        if (titleItem.name === item.props.title) {
                            props.key = titleItem.key;
                            props.onRender = _this4.handleNailRender.bind(_this4, titleItem.key);
                        }
                    });
                }
                return _react2.default.cloneElement(item, props);
            });

            return _react2.default.createElement(
                'div',
                this.props,
                Children
            );
        }
    }]);

    return ScrollListenBox;
}(_react2.default.Component);

exports.default = ScrollListenBox;

ScrollListenBox.defaultProps = {};