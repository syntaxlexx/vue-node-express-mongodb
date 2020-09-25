/**
 * Created by PhpStorm.
 * User: Lexx YungCarter
 * Github:  https://github.com/lexxyungcarter
 * Date: 2020-06-26
 * Time: 01:41
 */

import { immigrantKey, cKey, userKey } from './Util';
var CryptoJS = require("crypto-js");

/**
 * get credentials for authentication
 * @returns {{headers: {Accept: string, "x-access-token": string}}|{}}
 */
export const visa = () => {

    let tData = JSON.parse(window.localStorage.getItem(immigrantKey));

    if(tData)
    {
        // Decrypt
        var bytes  = CryptoJS.AES.decrypt(tData.fifty, cKey);

        const headers = {
            'Accept': 'application/json',
            // 'Authorization': 'Bearer ' + bytes.toString(CryptoJS.enc.Utf8),
            'x-access-token': bytes.toString(CryptoJS.enc.Utf8),
        }

        return { headers };
    }

    return { };
}

/**
 * check if authenticated
 * @returns {boolean}
 */
export const isAuthenticated = () => {
    return !!window.localStorage.getItem(immigrantKey);
}

/**
 * clear storage to logout user
 */
export const logout = () => {
    window.localStorage.removeItem(immigrantKey);
    window.localStorage.removeItem(userKey);
}

/**
 * save tokens to storage
 * @param pp
 */
export const borderPatrol = (pp) => {
    let received;
    try {
        received = JSON.parse(pp)
    } catch(err) {
        received = pp
    }

    if(typeof received == "object") {
        let data = {};
        if(received.access_token)
            data.fifty = CryptoJS.AES.encrypt(received.access_token, cKey).toString();

        if(received.refresh_token)
            data.cents = CryptoJS.AES.encrypt(received.refresh_token, cKey).toString();
        
        window.localStorage.setItem(immigrantKey, JSON.stringify(data));
    }
    else {
        let yungcarter = CryptoJS.AES.encrypt(received, cKey).toString();
        window.localStorage.setItem(immigrantKey, yungcarter);
    }
}

/**
 * set user to storage
 * @param user
 */
export const setUserToStorage = (user) => {
    window.localStorage.setItem(userKey, JSON.stringify(user));
}

/**
 * get user from storage
 * @returns {any}
 */
export const getUserFromStorage = () => {
    let user = window.localStorage.getItem(userKey)
    return user ? JSON.parse(user) : null
}
