/**
 * @author Lexx YungCarter
 * @email lexxyungcarter@gmail.com
 * Github:  https://github.com/lexxyungcarter
 * @modify date 2020-09-16 11:10
 */

import Base from '@/libs/requests/Base';
import Form from '@/libs/requests/Form';

import { fields } from './RoleRepository';
const routePrefix = 'roles'

export default class Role extends Base {

    constructor() {
        super(fields);

        this.form = new Form(fields);

        this.selected = null;

        this.roles = null;

        this.saved = false;

        this.deleted = false;

    }

    getAll(params = {}) {
        let url = `${routePrefix}?`;

        url += this.querifyObject(params)

        this.form.submit('get', url).then(response => {

            this.roles = response;

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

            flash({message: 'Role Added', alert: 'success'})

        });
    }

    update(id, prefill = false) {
        let data = this.columns
        this.saved = false;

        this.form.submit('put', `/${routePrefix}/${id}`, data).then(response => {

            this.saved = true;

            flash({message: 'Role Updated', alert: 'success'})

            if(prefill)
                this.prefill(response)
        });
    }

    delete(id) {
        this.deleted = false;
        let url = `/${routePrefix}/${id}`;

        this.form.submit('delete', url).then(response => {

            this.deleted = true;

            flash({message: 'Role Deleted', alert: 'success'})

        });
    }

    deleteAll() {
        this.deleted = false;

        this.form.submit('delete', `/${routePrefix}`, data).then(response => {

            this.deleted = true;

            flash({message: 'All Roles Deleted', alert: 'success'})

        });
    }

    reset() {
        this.columns.name = name
        this.columns.description = null
    }

    prefill(data) {
        this.columns.name = data.name
        this.columns.description = data.description
    }
}