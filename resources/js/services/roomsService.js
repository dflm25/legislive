/**
 * 
 * @param {*} data 
 */
import Http from '../Http';
import { host } from '../utils';

export function update_room_status (data) {
    return new Promise((resolve, reject) => {
        Http.post(`${host}/update-room`, data)
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
        Http.post(`${host}/save-room`, data)
        .then((response) => {
            const { data } = response;
            resolve(data)
        })
        .catch((error) => {
            reject(error)
        });
    })
}

export function get_my_rooms () {
    return new Promise((resolve, reject) => {
        Http.get(`${host}/get-all-rooms`)
        .then((response) => {
            const { data } = response;
            resolve(data)
        })
        .catch((error) => {
            reject(error)
        });
    })
}

export function get_public_rooms () {
    return new Promise((resolve, reject) => {
        Http.get(`${host}/get-rooms`)
        .then((response) => {
            const { data } = response;
            resolve(data)
        })
        .catch((error) => {
            reject(error)
        });
    })
}

export function get_room_info (id) {
    return new Promise((resolve, reject) => {
        Http.get(`${host}/get-room-info`, {
            params: {
              id: id
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