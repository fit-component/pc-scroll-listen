import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
import { CHANGE_ACTIVE_TITLE, CHANGE_BOX_ACTIVE_TITLE, SET_NAIL_INFO, changeActiveTitle, resetNailInfo } from '../actions'

export default class ScrollListenBox extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        this.nailArray = []

        this.unsubscribe = this.props.store.subscribe(() => {
            switch (this.props.store.getState().LastAction.type) {
            case CHANGE_ACTIVE_TITLE:
                break
            case CHANGE_BOX_ACTIVE_TITLE:
                this.scrollTo(this.props.store.getState().Nail.title)
                break
            case SET_NAIL_INFO:
                this.nailArray = this.props.store.getState().Nail.infos
                break
            }
        })
    }

    componentDidMount() {
        this.dom = ReactDOM.findDOMNode(this)
        this.$dom = $(this.dom)
        this.scrollSelf = this.getScrollSelf(ReactDOM.findDOMNode(this))
        this.scrollParent = this.getScrollParent(ReactDOM.findDOMNode(this))

        // parent不能等于self
        if (this.scrollParent === this.scrollSelf) {
            this.scrollParent = this.getScrollParent(this.scrollParent)
        }

        this.$scrollSelf = $(this.scrollSelf)
        this.$scrollParent = $(this.scrollParent)
        this.$scrollSelf.on('scroll', this.handleScroll.bind(this))
        console.log(this.scrollSelf)
        this.$scrollSelf.on('DOMSubtreeModified', this.resetNailInfo)
    }

    componentWillUnmount() {
        this.$dom.off('scroll', this.handleScroll.bind(this))
        this.$scrollSelf.off('DOMSubtreeModified', this.resetNailInfo)
        this.unsubscribe()
    }

    resetNailInfo() {
        this.props.store.dispatch(resetNailInfo())
    }

    handleScroll() {
        let newNailArray = Object.assign([], this.nailArray)
        let domTop = this.$scrollSelf.offset().top
        let scrollTop = this.$scrollSelf.scrollTop()
        newNailArray.sort((left, right)=> {
            return left.top > right.top
        })

        let topIndex = -1
        let currentTitle = ''
        newNailArray.map((item)=> {
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
        if (currentTitle === '' && newNailArray.length > 0) {
            currentTitle = newNailArray[0].title
        }

        this.props.store.dispatch(changeActiveTitle(currentTitle))
    }

    getScrollSelf(el) {
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

    getScrollParent(el) {
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
    scrollTo(title) {
        this.nailArray.map((item)=> {
            if (title === item.title) {
                this.$scrollSelf.animate({
                    scrollTop: item.top - this.$scrollSelf.offset().top - this.$scrollParent.scrollTop()
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

ScrollListenBox.defaultProps = {
    // @desc 传入实例化的store
    store: {}
}