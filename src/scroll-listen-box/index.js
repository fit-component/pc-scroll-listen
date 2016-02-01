import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'

export default class ScrollListenBox extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        this.nailArray = []

        //this.store = this.getParentStore(this.props.parent)
        //this.unsubscribe = this.store.subscribe(() => {
        //    this.scrollTo(this.store.getState().Nail.title)
        //    this.nailArray = this.store.getState().Nail.infos
        //})
    }

    componentDidMount() {
        this.dom = ReactDOM.findDOMNode(this)
        this.$dom = $(this.dom)
        this.$scrollParent = $(this.getScrollParent())
        this.$dom.on('scroll', this.handleScroll.bind(this))
    }

    componentWillUnmount() {
        this.$dom.off('scroll', this.handleScroll.bind(this))
        this.unsubscribe()
    }

    getParentStore(parent) {
        if (parent.props.type.name !== 'ScrollListenContainer') {
            return this.getParentStore(parent.props.parent)
        } else {
            return parent.store
        }
    }

    handleScroll() {
        let domTop = this.$dom.offset().top
        let scrollTop = this.$dom.scrollTop()
        this.nailArray.sort((left, right)=> {
            return left.top > right.top
        })

        let topIndex = -1
        let currentTitle = ''
        this.nailArray.map((item)=> {
            if (scrollTop > item.top - domTop - this.$scrollParent.scrollTop() - 1) {
                if (topIndex === 1)return
                topIndex = 0
                currentTitle = item.title
            } else {
                if (topIndex === 0) {
                    topIndex = 1
                }
            }
        })

        // 默认取第一个
        if (currentTitle === '' && this.nailArray.length > 0) {
            currentTitle = this.nailArray[0].title
        }

        console.log(currentTitle)
        // this.props.onScrollKeyChange(currentTitle)
    }

    getScrollParent() {
        while (this.dom = this.dom.parentElement) {
            switch (window.getComputedStyle(this.dom)['overflowY']) {
            case 'auto':
            case 'scroll':
            case 'overlay':
                return this.dom
            }
        }
        return window
    }

    // 手动切换滑动
    scrollTo(title) {
        this.nailArray.map((item)=> {
            if (title === item.title) {
                this.$dom.animate({
                    scrollTop: item.top - this.$dom.offset().top - this.$scrollParent.scrollTop()
                }, 200)
            }
        })
    }

    render() {
        return (
            <div {...this.props}>
                {this.props.children}
            </div>
        )
    }
}

ScrollListenBox.defaultProps = {}