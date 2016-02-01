import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'

export default class ScrollListenBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nailArray: []
        }
    }

    handleScroll() {
        let newNailArray = Object.assign([], this.state.nailArray)
        let domTop = this.$scrollSelf.offset().top
        let scrollTop = this.$scrollSelf.scrollTop()
        newNailArray.sort((left, right)=> {
            return left.top > right.top
        })

        let topIndex = -1
        let currentKey = ''
        newNailArray.map((item)=> {
            console.log(item.top - domTop - this.$scrollParent.scrollTop())
            if (scrollTop > item.top - domTop - this.$scrollParent.scrollTop() - 1) {
                if (topIndex === 1)return
                topIndex = 0
                currentKey = item.key
            } else {
                if (topIndex === 0) {
                    topIndex = 1
                }
            }
        })

        // 默认取第一个
        if (currentKey === '' && newNailArray.length > 0) {
            currentKey = newNailArray[0].key
        }

        this.props.onScrollKeyChange && this.props.onScrollKeyChange(currentKey)
    }

    componentDidMount() {
        this.dom = ReactDOM.findDOMNode(this)
        this.$dom = $(this.dom)
        this.$scrollSelf = $(this.getScrollSelf())
        this.$scrollParent = $(this.getScrollParent())
        this.$scrollSelf.on('scroll', this.handleScroll.bind(this))
    }

    componentWillUnmount() {
        this.$scrollSelf.off('scroll', this.handleScroll.bind(this))
    }

    getScrollSelf() {
        let el = ReactDOM.findDOMNode(this)
        do {
            switch (window.getComputedStyle(el)['overflowY']) {
            case 'auto':
            case 'scroll':
            case 'overlay':
                return el
            }
        } while (el = el.parentElement)

        return window
    }

    getScrollParent() {
        let el = ReactDOM.findDOMNode(this)
        while (el = el.parentElement) {
            switch (window.getComputedStyle(el)['overflowY']) {
            case 'auto':
            case 'scroll':
            case 'overlay':
                return el
            }
        }

        return window
    }

    handleNailRender(key, top) {
        let newNailArray = this.state.nailArray
        newNailArray.push({
            key: key,
            top: top
        })
        this.setState({
            nailArray: newNailArray
        })
    }

    // 手动切换滑动
    scrollTo(key) {
        this.state.nailArray.map((item)=> {
            if (key === item.key) {
                this.$dom.animate({
                    scrollTop: item.top - this.$dom.offset().top - this.$scrollParent.scrollTop()
                }, 200)
            }
        })
    }

    render() {
        let Children = React.Children.map(this.props.children, (item)=> {
            let props = Object.assign({}, item.props)
            if (item.type.name === 'ScrollListenNail') {
                this.props.titles.map((titleItem)=> {
                    if (titleItem.name === item.props.title) {
                        props.key = titleItem.key
                        props.onRender = this.handleNailRender.bind(this, titleItem.key)
                    }
                })
            }
            return React.cloneElement(item, props)
        })

        return (
            <div {...this.props}>
                {Children}
            </div>
        )
    }
}

ScrollListenBox.defaultProps = {}