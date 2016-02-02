'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setNailInfo = setNailInfo;
exports.changeActiveTitle = changeActiveTitle;
exports.changeBoxActiveTitle = changeBoxActiveTitle;
var SET_NAIL_INFO = exports.SET_NAIL_INFO = 'SET_NAIL_INFO';
var CHANGE_ACTIVE_TITLE = exports.CHANGE_ACTIVE_TITLE = 'CHANGE_ACTIVE_TITLE';
var CHANGE_BOX_ACTIVE_TITLE = exports.CHANGE_BOX_ACTIVE_TITLE = 'CHANGE_BOX_ACTIVE_TITLE';

function setNailInfo(info) {
    return {
        type: SET_NAIL_INFO,
        info: info
    };
}

function changeActiveTitle(title) {
    return {
        type: CHANGE_ACTIVE_TITLE,
        title: title
    };
}

function changeBoxActiveTitle(title) {
    return {
        type: CHANGE_BOX_ACTIVE_TITLE,
        title: title
    };
}