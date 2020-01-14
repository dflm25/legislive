import axios from 'axios';
import store from './store';
import * as actions from './store/actions';

const token = localStorage.getItem('access_token');
axios.defaults.headers.common.Authorization = `Bearer ${token}`;


// axios.defaults.params = {};
axios.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      store.dispatch(actions.authLogout());
    }
    return Promise.reject(error);
  },
);

export default axios;
