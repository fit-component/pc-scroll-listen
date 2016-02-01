import { combineReducers } from 'redux'
import { SET_NAIL_INFO, CHANGE_ACTIVE_TITLE } from './actions'

const Nail = (state = [], action) => {
    switch (action.type) {
    case SET_NAIL_INFO:
        let newInfos = state.infos || []
        newInfos.push(action.info)
        return Object.assign({}, state, {
            infos: newInfos
        })
        break
    case CHANGE_ACTIVE_TITLE:
        return Object.assign({}, state, {
            title: action.title
        })
        break
    default:
        return state
    }
}

const ScrollListenApp = combineReducers({
    Nail
})

export default ScrollListenApp