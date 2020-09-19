/**
 * @author Lexx YungCarter
 * @email lexxyungcarter@gmail.com
 * Github:  https://github.com/lexxyungcarter
 * @modify date 2020-09-16 11:10
 */

import Base from '@/libs/requests/Base';
import Form from '@/libs/requests/Form';

import { fields } from './TutorialRepository';
const routePrefix = 'tutorials'

export default class Tutorial extends Base {

    constructor() {
        super(fields);

        this.form = new Form(fields);

        this.selected = null;

        this.tutorials = null;

        this.saved = false;

        this.deleted = false;

    }

    getAll(params = {}) {
        let url = `${routePrefix}?`;

        url += this.querifyObject(params)

        this.form.submit('get', url).then(response => {

            this.tutorials = response;

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

            flash({message: 'Tutorial Added', alert: 'success'})

        });
    }

    update(id, prefill = false) {
        let data = this.columns
        this.saved = false;

        this.form.submit('put', `/${routePrefix}/${id}`, data).then(response => {

            this.saved = true;

            flash({message: 'Tutorial Updated', alert: 'success'})

            if(prefill)
                this.prefill(response)
        });
    }

    delete(id) {
        this.deleted = false;
        let url = `/${routePrefix}/${id}`;

        this.form.submit('delete', url).then(response => {

            this.deleted = true;

            flash({message: 'Tutorial Deleted', alert: 'success'})

        });
    }

    deleteAll() {
        this.deleted = false;

        this.form.submit('delete', `/${routePrefix}`, data).then(response => {

            this.deleted = true;

            flash({message: 'All Tutorials Deleted', alert: 'success'})

        });
    }

    findByTitle(title) {
        let url = `/${routePrefix}?title=${title}`

        this.form.submit('get', url).then(response => {

            this.tutorials = response;

        });
    }

    reset() {
        this.columns.title = null
        this.columns.description = null
        this.columns.published = false
    }

    prefill(data) {
        this.columns.title = data.title
        this.columns.description = data.description
        this.columns.published = data.published
    }
}