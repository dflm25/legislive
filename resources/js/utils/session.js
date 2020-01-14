/**
 * Session localStorage information
 */

export const getUserCompany = () => {
    return JSON.parse(window.localStorage.getItem('companies'));
}


export const get_user = () => {
    return JSON.parse(window.localStorage.getItem('user'));
}

