import Http from '../Http';
import * as action from '../store/actions';

export function login(credentials) {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.post('/login', credentials)
        .then((res) => {
          dispatch(action.authLogin(res.data));
          return resolve();
        })
        .catch((err) => {
          const { status, data } = err.response;
          return reject({
            status,
            data,
          });
        });
    })
  );
}

export function register(credentials) {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.post('/register', credentials)
        .then(res => resolve(res.data))
        .catch((err) => {
          const { status, data } = err.response;
          return reject({
            status,
            data,
          });
        });
    })
  );
}

export function resetPassword(credentials) {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.post('/forgot-password', credentials)
        .then(res => resolve(res.data))
        .catch((err) => {
          const { status, errors } = err.response.data;
          const data = {
            status,
            errors,
          };
          return reject(data);
        });
    })
  );
}

export function updatePassword(credentials) {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.post('/password-reset', credentials)
        .then((res) => {
          const { status } = res.data.status;
          if (status === 202) {
            const data = {
              error: res.data.message,
              status,
            };
            return reject(data);
          }
          return resolve(res);
        })
        .catch((err) => {
          const { status, errors } = err.response.data;
          const data = {
            status,
            errors,
          };
          return reject(data);
        });
    })
  );
}
