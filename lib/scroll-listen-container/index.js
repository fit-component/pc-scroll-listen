'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _findTreeByName = require('../find-tree-by-name');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScrollListenContainer = function (_React$Component) {
    _inherits(ScrollListenContainer, _React$Component);

    function ScrollListenContainer(props) {
        _classCallCheck(this, ScrollListenContainer);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ScrollListenContainer).call(this, props));

        _this.state = {
            key: ''
        };
        return _this;
    }

    _createClass(ScrollListenContainer, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.ScrollListenBox = null;
            this.ScrollListen = null;
        }

        // 滚动修改当前key

    }, {
        key: 'handleScrollKeyChange',
        value: function handleScrollKeyChange(key) {
            this.setState({
                key: key
            });
        }

        // 手动修改当前key

    }, {
        key: 'handleClickKeyChange',
        value: function handleClickKeyChange(key) {
            this.refs['box'].scrollTo(key);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var boxFindTree = (0, _findTreeByName.findTreeByName)(this.props.children, 'ScrollListenBox');
            var listenFindTree = (0, _findTreeByName.findTreeByName)(this.props.children, 'ScrollListen');

            var boxChildren = (0, _findTreeByName.getTargetByTree)(boxFindTree);
            var listenChildren = (0, _findTreeByName.getTargetByTree)(listenFindTree);

            // 生成titles
            var titles = [];
            var nailFindTree = (0, _findTreeByName.findTreeByName)(boxChildren.props.children, 'ScrollListenNail');
            console.log(nailFindTree);

            //React.Children.map(item.props.children, (nailItem, index)=> {
            //    if (nailItem.type.name !== 'ScrollListenNail')return
            //    titles.push({
            //        key: index,
            //        name: nailItem.props.title
            //    })
            //})

            //let MergedChildren = this.findTree.map((children)=> {
            //    let props = Object.assign({}, children.props)
            //    return React.cloneElement(children, props)
            //})

            //console.log(this.findTree)
            //this.getChildrenByName(this.props.children, 'ScrollListen')
            //console.log(this.ScrollListenBox)

            var Children = _react2.default.Children.map(this.props.children, function (item) {
                var props = _extends({}, item.props);
                if (item.type.name === 'ScrollListenBox') {
                    props.onScrollKeyChange = _this2.handleScrollKeyChange.bind(_this2);
                    props.ref = 'box';
                    props.titles = titles;
                }
                if (item.type.name === 'ScrollListen') {
                    props.onChange = _this2.handleClickKeyChange.bind(_this2);
                    props.activeKey = _this2.state.key;
                    props.titles = titles;
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

    return ScrollListenContainer;
}(_react2.default.Component);

exports.default = ScrollListenContainer;

ScrollListenContainer.defaultProps = {};