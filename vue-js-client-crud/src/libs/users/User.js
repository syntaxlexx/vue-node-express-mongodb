/**
 * @author Lexx YungCarter
 * @email lexxyungcarter@gmail.com
 * Github:  https://github.com/lexxyungcarter
 * @modify date 2020-09-16 11:10
 */

import Base from '@/libs/requests/Base';
import Form from '@/libs/requests/Form';

import { fields } from './UserRepository';
const routePrefix = 'users'

export default class User extends Base {

    constructor() {
        super(fields);

        this.form = new Form(fields);

        this.selected = null;

        this.users = null;

        this.saved = false;

        this.deleted = false;

    }

    getAll(params = {}) {
        let url = `${routePrefix}?`;

        url += this.querifyObject(params)

        this.form.submit('get', url).then(response => {

            this.users = response;

        });
    }

    get(id, prefill = false) {
        let url = `/${routePrefix}/${id}`;

        this.form.submit('get', url).then(response => {

            this.selected = response;

            if(prefill)
                this.prefill(response)

        });
    }

    create() {
        let data = this.columns
        this.saved = false;

        this.form.submit('post', `/${routePrefix}`, data).then(response => {

            this.saved = true;

            flash({message: 'User Added', alert: 'success'})

        });
    }

    update(id, prefill = false) {
        let data = this.columns
        this.saved = false;

        this.form.submit('put', `/${routePrefix}/${id}`, data).then(response => {

            this.saved = true;

            flash({message: 'User Updated', alert: 'success'})

            if(prefill)
                this.prefill(response)
        });
    }

    delete(id) {
        this.deleted = false;
        let url = `/${routePrefix}/${id}`;

        this.form.submit('delete', url).then(response => {

            this.deleted = true;

            flash({message: 'User Deleted', alert: 'success'})

        });
    }

    deleteAll() {
        this.deleted = false;

        this.form.submit('delete', `/${routePrefix}`, data).then(response => {

            this.deleted = true;

            flash({message: 'All Users Deleted', alert: 'success'})

        });
    }

    findByUsername(title) {
        let url = `/${routePrefix}?title=${title}`

        this.form.submit('get', url).then(response => {

            this.users = response;

        });
    }

    register() {
        let data = this.columns
        this.saved = false;
        let url = `auth/signup`;

        this.form.submit('post', url, data).then(response => {

            this.saved = true;

            this.selected = response.user

            flash({message: 'Registration Successful', alert: 'success'})

        });
    }

    reset() {
        this.columns.username = null
        this.columns.email = null
        this.columns.password = null
        this.columns.password_confirmation = null
        this.columns.first_name = null
        this.columns.last_name = null
        this.columns.nickname = null
        this.columns.phone = null
        this.columns.roles = ['user']
    }

    prefill(data) {
        this.columns.username = data.username
        this.columns.email = data.email
        this.columns.phone = data.phone
        this.columns.first_name = data.first_name
        this.columns.last_name = data.last_name
        this.columns.nickname = data.nickname
        this.columns.roles = data.user.roles
    }
}