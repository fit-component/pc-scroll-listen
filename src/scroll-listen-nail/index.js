import React from 'react'
import $ from 'jquery'

export default class ScrollListenNail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        this.$dom = $(ReactDOM.findDOMNode(this))
        setTimeout(()=> {
            this.props.onRender(this.$dom.offset().top)
        })
    }

    render() {
        return (
            <div {...this.props}></div>
        )
    }
}

ScrollListenNail.defaultProps = {
    onRender: ()=> {
    }
}