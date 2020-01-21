/**
 * General states
 */

import * as ActionTypes from '../action-types';

export const title = (state = '', { type, payload = '' }) => {
    switch (type) {
        case ActionTypes.SET_TITLE:
            return payload;
        default:
            return state;
    }
};


export const currentRoom = (state = '', { type, payload = '' }) => {
    switch (type) {
        case ActionTypes.CURRENT_ROOM:
            return payload;
        default:
            return state;
    }
};