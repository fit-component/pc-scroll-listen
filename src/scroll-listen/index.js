import React from 'react'
import classNames from 'classnames'
import { changeActiveTitle } from '../actions'
import './index.scss'

export default class ScrollListen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nails: []
        }
    }

    componentWillMount() {
        //this.store = this.getParentStore(this.props.parent)
        //this.unsubscribe = this.store.subscribe(() => {
        //    this.setState({
        //        nails: this.store.getState().Nail.infos
        //    })
        //})
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
        store.dispatch(changeActiveTitle(value))
    }

    render() {
        let Children = this.state.nails.map((item, index)=> {
            let itemClass = classNames({
                item: true,
                active: this.props.activeTitle === item.title
            })
            return (
                <div key={index}
                     onClick={this.handleClick.bind(this,item.title)}
                     className={itemClass}>{item.title}</div>
            )
        })

        return (
            <div className="_namespace">
                {Children}
            </div>
        )
    }
}

ScrollListen.defaultProps = {
    // @desc 当前激活的title
    activeTitle: ''
}