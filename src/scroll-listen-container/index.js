import React from 'react'
import { findTreeByName, getTargetByTree } from '../find-tree-by-name'

export default class ScrollListenContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            key: ''
        }
    }

    componentWillMount() {
        this.ScrollListenBox = null
        this.ScrollListen = null
    }

    // 滚动修改当前key
    handleScrollKeyChange(key) {
        this.setState({
            key: key
        })
    }

    // 手动修改当前key
    handleClickKeyChange(key) {
        this.refs['box'].scrollTo(key)
    }

    // 递归生成children
    createChildren(children, findTree, index = 0) {
        console.log(children)
        return React.Children.map(children, (item, itemIndex)=> {
            if (item.props && item.props.children) {
                //return React.cloneElement(children, children.props, this.createChildren(item.props.children, findTree, itemIndex + 1))
                let cc = this.createChildren(item.props.children, findTree, itemIndex + 1)
                if (cc.type===undefined){
                    console.log(children)
                }
                return React.cloneElement(children, children.props, children.props.children)
            } else if (item.props && !item.props.children) {
                return React.cloneElement(children, children.props)
            } else {
                return React.cloneElement(children)
            }
        })
        // 如果不是最后一个,直接往下递归
        //if (index !== findTree.length - 1) {
        //    console.log('数组', children)
        //    return React.cloneElement(children)
        //} else {
        //    console.log('到了!')
        //}
    }

    render() {
        let boxFindTree = findTreeByName(this.props.children, 'ScrollListenBox')
        let listenFindTree = findTreeByName(this.props.children, 'ScrollListen')
        let boxChildren = getTargetByTree(boxFindTree)
        let nailFindTree = findTreeByName(boxChildren.props.children, 'ScrollListenNail')

        // 生成titles
        let titles = []
        // 找到上一级
        if (nailFindTree.length >= 2) {
            nailFindTree.pop()
        }
        let nailParent = getTargetByTree(nailFindTree)
        React.Children.map(nailParent.props.children, (nailItem, index)=> {
            if (nailItem.type.name !== 'ScrollListenNail')return
            titles.push({
                key: index,
                name: nailItem.props.title
            })
        })

        let Children = this.createChildren(this.props.children, boxFindTree)

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

        return (
            <div {...this.props}>{Children}</div>
        )
    }
}

ScrollListenContainer.defaultProps = {}