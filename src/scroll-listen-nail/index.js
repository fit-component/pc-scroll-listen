import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
import classNames from 'classnames'
import { setNailInfo, RESET_NAIL_INFO } from '../actions'

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

        this.unsubscribe = this.props.store.subscribe(() => {
            switch (this.props.store.getState().LastAction.type) {
            case RESET_NAIL_INFO:
                setTimeout(()=> {
                    this.props.store.dispatch(setNailInfo({
                        title: this.props.title,
                        top: this.$dom.offset().top
                    }))
                })
                break
            }
        })
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    render() {
        const {className, ...others} = this.props
        const classes = classNames({
            '_namespace': true,
            [className]: className
        })

        return (
            <div {...others} className={classes}></div>
        )
    }
}

ScrollListenNail.defaultProps = {
    // @desc 传入实例化的store
    store: {}
}