import * as ActionTypes from '../action-types';

export function authLogin(payload) {
  return {
    type: ActionTypes.AUTH_LOGIN,
    payload,
  };
}

export function authLogout() {
  return {
    type: ActionTypes.AUTH_LOGOUT,
  };
}

export function authCheck() {
  return {
    type: ActionTypes.AUTH_CHECK,
  };
}

/**
 * General set main modal
 * @param {*} payload 
 */
export function setModal (state, title, form, action, data = []) {
  return { 
    type: ActionTypes.SHOW_MODAL,
    payload: { 
      data: data,
      state: state, 
      title: title, 
      form: form, 
      action: action
    },
  };
}

export function setTitle (payload) {
  return { 
    type: ActionTypes.SET_TITLE,
    payload
  };
}
