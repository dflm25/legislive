import Http from '../Http';
import { host } from '../utils/index';

export function get_levels() {
    return new Promise((resolve, reject) => {
        Http.get(`api/v1/get-levels`)
        .then((response) => {
            const { data } = response;
            resolve(data)
        })
        .catch((error) => {
            reject(error)
        });
    })
}

export function get_sub_levels () {
    return new Promise((resolve, reject) => {
        Http.get(`api/v1/get-sub-levels`)
        .then((response) => {
            const { data } = response;
            resolve(data)
        })
        .catch((error) => {
            reject(error)
        });
    })
}

export function post_company_levels (credentials) {
    return new Promise((resolve, reject) => {
        Http.post('/api/v1/company-sublevel', credentials)
          .then((res) => {
            const { data } = err.response;
            return resolve(data);
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
}

export function update_status (status) {
    return new Promise((resolve, reject) => {
        Http.put(`${host}/update-status`, { status: status })
        .then((response) => {
            const { data } = response;
            resolve(data)
        })
        .catch((error) => {
            reject(error)
        });
    })
}