/**
 * Created by PhpStorm.
 * User: Lexx YungCarter
 * Github:  https://github.com/lexxyungcarter
 * Date: 2020-06-26
 * Time: 01:41
 */

import { immigrantKey, cKey } from './Util';
var CryptoJS = require("crypto-js");

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

export const logout = () => {
    window.localStorage.removeItem(immigrantKey);
}

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
