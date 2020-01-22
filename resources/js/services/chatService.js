/**
 * 
 * @param {chat Service} data 
 */

import Http from '../Http';
import { host } from '../utils';

export function send_message (data) {
    return new Promise((resolve, reject) => {
        Http.post(`${host}/chat/save-message`, data)
        .then((response) => {
            const { data } = response;
            resolve(data)
        })
        .catch((error) => {
            reject(error)
        });
    })
}