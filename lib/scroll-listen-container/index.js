'use strict';

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

        // 递归生成children

    }, {
        key: 'createChildren',
        value: function createChildren(children, findTree) {
            var _this2 = this;

            var index = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

            console.log(children);
            return _react2.default.Children.map(children, function (item, itemIndex) {
                if (item.props && item.props.children) {
                    //return React.cloneElement(children, children.props, this.createChildren(item.props.children, findTree, itemIndex + 1))
                    var cc = _this2.createChildren(item.props.children, findTree, itemIndex + 1);
                    if (cc.type === undefined) {
                        console.log(children);
                    }
                    return _react2.default.cloneElement(children, children.props, children.props.children);
                } else if (item.props && !item.props.children) {
                    return _react2.default.cloneElement(children, children.props);
                } else {
                    return _react2.default.cloneElement(children);
                }
            });
            // 如果不是最后一个,直接往下递归
            //if (index !== findTree.length - 1) {
            //    console.log('数组', children)
            //    return React.cloneElement(children)
            //} else {
            //    console.log('到了!')
            //}
        }
    }, {
        key: 'render',
        value: function render() {
            var boxFindTree = (0, _findTreeByName.findTreeByName)(this.props.children, 'ScrollListenBox');
            var listenFindTree = (0, _findTreeByName.findTreeByName)(this.props.children, 'ScrollListen');
            var boxChildren = (0, _findTreeByName.getTargetByTree)(boxFindTree);
            var nailFindTree = (0, _findTreeByName.findTreeByName)(boxChildren.props.children, 'ScrollListenNail');

            // 生成titles
            var titles = [];
            // 找到上一级
            if (nailFindTree.length >= 2) {
                nailFindTree.pop();
            }
            var nailParent = (0, _findTreeByName.getTargetByTree)(nailFindTree);
            _react2.default.Children.map(nailParent.props.children, function (nailItem, index) {
                if (nailItem.type.name !== 'ScrollListenNail') return;
                titles.push({
                    key: index,
                    name: nailItem.props.title
                });
            });

            var Children = this.createChildren(this.props.children, boxFindTree);

            //let Children = React.Children.map(this.props.children, (item)=> {
            //    let props = Object.assign({}, item.props)
            //    if (item.type.name === 'ScrollListenBox') {
            //        props.onScrollKeyChange = this.handleScrollKeyChange.bind(this)
            //        props.ref = 'box'
            //        props.titles = titles
            //    }
            //    if (item.type.name === 'ScrollListen') {
            //        props.onChange = this.handleClickKeyChange.bind(this)
            //        props.activeKey = this.state.key
            //        props.titles = titles
            //    }
            //    return React.cloneElement(item, props)
            //})

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