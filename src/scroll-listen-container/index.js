import React from 'react'

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

    getChildrenByName(parent, childrenName, index = 0) {
        // 搜索树最大10层
        if (index > 10)return
        if (this.findTree.length + 1 < index) {
            this.findTree.push(parent)
        } else {
            this.findTree[index] = parent
        }

        React.Children.map(parent, (item)=> {
            if (this[childrenName] !== null)return
            if (item.type && item.type.name === childrenName) {
                this[childrenName] = item
            } else if (item.props && item.props.children) {
                this.getChildrenByName(item.props.children, childrenName, index + 1)
            }
        })
    }

    render() {
        this.findTree = []
        this.getChildrenByName(this.props.children, 'ScrollListenBox')
        // 如果最后一个不是,则去除
        if (!this.findTree[this.findTree.length - 1].type || this.findTree[this.findTree.length - 1].type.name !== 'ScrollListenBox') {
            this.findTree.pop()
        }
        //console.log(this.findTree)
        //this.getChildrenByName(this.props.children, 'ScrollListen')
        //console.log(this.ScrollListenBox)

        // 生成titles
        let titles = []
        React.Children.map(this.props.children, (item)=> {
            if (item.type.name !== 'ScrollListenBox') return
            React.Children.map(item.props.children, (nailItem, index)=> {
                if (nailItem.type.name !== 'ScrollListenNail')return
                titles.push({
                    key: index,
                    name: nailItem.props.title
                })
            })
        })

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