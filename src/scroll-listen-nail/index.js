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
        setTimeout(()=> {
            this.props.store.dispatch(setNailInfo({
                title: this.props.title,
                top: this.$dom.offset().top
            }))
        })
    }

    render() {
        return (
            <div {...this.props}></div>
        )
    }
}

ScrollListenNail.defaultProps = {
    // @desc 传入实例化的store
    store: {}
}