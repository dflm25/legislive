/**
 * 
 * @param {*} data 
 */
import Http from '../Http';

export function update_room_status (data) {
    return new Promise((resolve, reject) => {
        Http.post(`update-room`, data)
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
        Http.post(`save-room`, data)
        .then((response) => {
            const { data } = response;
            resolve(data)
        })
        .catch((error) => {
            reject(error)
        });
    })
}
