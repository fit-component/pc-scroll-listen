import React from 'react'
import classNames from 'classnames'
import './index.scss'

export default class ScrollListen extends React.Component {
    constructor(props) {
        super(props)
    }

    handleClick(value) {
        this.props.onChange(value)
    }

    render() {
        let Children = this.props.titles.map((item, index)=> {
            let itemClass = classNames({
                item: true,
                active: this.props.activeKey === item.key
            })
            return (
                <div key={index}
                     onClick={this.handleClick.bind(this,item.key)}
                     className={itemClass}>{item.name}</div>
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
    // @desc title数组
    titles: [],

    // @desc 点击选择的回调
    onChange: ()=> {
    },

    // @desc 当前激活的key
    activeKey: ''
}