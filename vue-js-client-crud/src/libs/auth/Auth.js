/**
 * @author Lexx YungCarter
 * @email lexxyungcarter@gmail.com
 * Github:  https://github.com/lexxyungcarter
 * @modify date 2020-09-16 11:10
 */

import Base from '@/libs/requests/Base';
import Form from '@/libs/requests/Form';

import { fields } from "./AuthRepository";
import { borderPatrol, setUserToStorage } from "@/utils/Customs";

export default class Auth extends Base {
    constructor() {
        super(fields);

        this.form = new Form(fields);

        this.saved = false;

        this.user = null;

        this.authenticated = false;
    }

    signin() {
        let url = `auth/signin`;
        let data = this.columns

        this.form.submit('post', url, data).then(response => {

            this.user = response.user;

            setUserToStorage(this.user);

            if(response.hasOwnProperty('access_token')) {
                borderPatrol({
                    access_token: response.access_token
                })
            }

            this.authenticated = true;

        });
    }

    reset() {
        this.columns.username = null
        this.columns.password = null
    }
}