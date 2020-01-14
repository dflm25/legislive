/**
 * Units services, get levels, sub levels
 */

import Http from '../Http';

export function get_levels () {
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

export function get_sub_levels (levelId) {
    return new Promise((resolve, reject) => {
        Http.get(`api/v1/get-sub-levels`, {
            params: {
              level: levelId
            }
        })
        .then((response) => {
            const { data } = response;
            resolve(data)
        })
        .catch((error) => {
            reject(error)
        });
    })
}

export function sendForm (data) {
    return new Promise((resolve, reject) => {
        Http.post(`api/v1/unit/save`, data)
        .then((response) => {
            const { data } = response;
            resolve(data)
        })
        .catch((error) => {
            reject(error)
        });
    })
}

export function get_unit (id) {
    return new Promise((resolve, reject) => {
        Http.get(`api/v1/unit/${id}`)
        .then((response) => {
            const { data } = response;
            resolve(data);
        })
        .catch((error) => {
            reject(error);
        });
    })
}