export const SET_NAIL_INFO = 'SET_NAIL_INFO'
export const CHANGE_ACTIVE_TITLE = 'CHANGE_ACTIVE_TITLE'

export function setNailInfo(info) {
    return {
        type: SET_NAIL_INFO,
        info: info
    }
}

export function changeActiveTitle(title) {
    return {
        type: CHANGE_ACTIVE_TITLE,
        title
    }
}