import * as ActionTypes from '../action-types';

const defaultValue = {
    state: false,
    title: '',
    form: ''
};

const statusModal = (state = defaultValue, { type, payload = {} }) => {
    switch (type) {
        case ActionTypes.SHOW_MODAL:
            return payload;
        default:
            return state;
    }
};

export default statusModal;