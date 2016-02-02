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

    render() {
        let boxFindTree = findTreeByName(this.props.children, 'ScrollListenBox')
        let listenFindTree = findTreeByName(this.props.children, 'ScrollListen')

        let boxChildren = getTargetByTree(boxFindTree)
        let listenChildren = getTargetByTree(listenFindTree)

        // 生成titles
        let titles = []
        let nailFindTree = findTreeByName(boxChildren.props.children, 'ScrollListenNail')
        console.log(nailFindTree)

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


        let Children = React.Children.map(this.props.children, (item)=> {
            let props = Object.assign({}, item.props)
            if (item.type.name === 'ScrollListenBox') {
                props.onScrollKeyChange = this.handleScrollKeyChange.bind(this)
                props.ref = 'box'
                props.titles = titles
            }
            if (item.type.name === 'ScrollListen') {
                props.onChange = this.handleClickKeyChange.bind(this)
                props.activeKey = this.state.key
                props.titles = titles
            }
            return React.cloneElement(item, props)
        })

        return (
            <div {...this.props}>{Children}</div>
        )
    }
}

ScrollListenContainer.defaultProps = {}