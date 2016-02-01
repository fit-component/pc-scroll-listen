import React from 'react'
import $ from 'jquery'
import { setNailInfo } from '../actions'

export default class ScrollListenNail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        this.$dom = $(ReactDOM.findDOMNode(this))
        //this.store = this.getParentStore(this.props.parent)
        //setTimeout(()=> {
        //    this.store.dispatch(setNailInfo({
        //        title: this.props.title,
        //        offsetTop: this.$dom.offset().top
        //    }))
        //})
    }

    getParentStore(parent) {
        if (parent.props.type.name !== 'ScrollListenContainer') {
            return this.getParentStore(parent.props.parent)
        } else {
            return parent.store
        }
    }

    render() {
        return (
            <div {...this.props}></div>
        )
    }
}

ScrollListenNail.defaultProps = {}