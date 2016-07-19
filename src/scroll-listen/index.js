import React from 'react'
import classNames from 'classnames'
import { changeBoxActiveTitle } from '../actions'
import './index.scss'

export default class ScrollListen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nails: [],
            activeTitle: ''
        }
    }

    componentWillMount() {
        this.unsubscribe = this.props.store.subscribe(() => {
            const nails = this.props.store.getState().Nail.infos
            //let skipNails = true
            //let skipTitle = true
            //nails.map((item, index)=> {
            //    let nailNoExist = this.state.nails.length < index
            //    let nailNoEqual = this.state.nails.length > index && (this.state.nails[index].title !== item.title || this.state.nails[index].top !== item.top)
            //    if (nailNoExist || nailNoEqual) {
            //        console.log(this.state.nails[index].title, item.title, this.state.nails[index].top, item.top)
            //        skipNails = false
            //    }
            //    if (this.props.store.getState().Nail.title !== this.state.activeTitle) {
            //        skipTitle = false
            //    }
            //})

            //if (!skipNails) {
            //    this.setState({
            //        nails: nails
            //    })
            //}
            //if (!skipTitle) {
            //    this.setState({
            //        activeTitle: this.props.store.getState().Nail.title
            //    })
            //}
            this.setState({
                nails: nails,
                activeTitle: this.props.store.getState().Nail.title
            })
        })
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    getParentStore(parent) {
        if (parent.props.type.name !== 'ScrollListenContainer') {
            return this.getParentStore(parent.props.parent)
        } else {
            return parent.store
        }
    }

    handleClick(value) {
        this.props.store.dispatch(changeBoxActiveTitle(value))
    }

    render() {
        const {className, store, activeTitle, ...others} = this.props
        const classes = classNames({
            '_namespace': true,
            [className]: className
        })

        let Children = this.state.nails.map((item, index)=> {
            let itemClass = classNames({
                item: true,
                active: this.state.activeTitle === item.title
            })
            return (
                <div key={index}
                     onClick={this.handleClick.bind(this,item.title)}
                     className={itemClass}>{item.title}</div>
            )
        })

        return (
            <div {...others} className={classes}>
                {Children}
            </div>
        )
    }
}

ScrollListen.defaultProps = {
    // @desc 当前激活的title
    activeTitle: '',

    // @desc 传入实例化的store
    store: {}
}