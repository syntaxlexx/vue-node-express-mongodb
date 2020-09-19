/**
 * Created by PhpStorm.
 * User: lexxyungcarter
 * Date: 2020-09-14
 * Time: 02:56
 */

import _ from 'lodash'

export default class Errors{
    constructor(fields) {
        this.errors = Errors.setErrors(fields);
    }

    /**
     * Set the errors variable and initialize it to have the fields required
     * This is done because of Vue's reactivity issues when finding uninitialized data
     */
    static setErrors(fields) {
        let errors = {};

        for(let field in fields) {
            errors[field] = '';
        }

        return errors;
    }

    any() {
        for(let field in this.errors) {
            if(this.errors[field]) {
                return true;
            }
        }
    }

    /**
     * Checks if the errors object has a certain field
     */
    has(field) {
        if(this.errors[field]) {
            return true;
        }

        return false;
    }

    /**
     * Return an errors property if it exists within the errors object
     */
    get(field) {
        return this.has(field) ? this.errors[field] : "";
    }

    /**
     * manually set an error
     * error: {field: '', message: ''}
     */
    add(error) {
        let vueEnabled = window.Vue;

        if(vueEnabled) {
            window.Vue.set(this.errors, error.field, error.message);
        } else {
            this.errors[error.field] = error.message;
        }

    }

    /**
     * clear the field from errors
     */
    clear(field) {
        if(field) {
            this.errors[field] = '';
        } else {
            this.errors = {};
        }
    }

    /**
     * Record the errors into the errors object
     */
    record(errors) {
        errors = errors.errors;
        let vueEnabled = window.Vue;

        for(let error in errors) {
            if(vueEnabled) {
                window.Vue.set(this.errors, error, errors[error][0]);
            } else {
                this.errors[error] = errors[error][0];
            }
        }
    }

    /**
     * display all errors in a <ul>
     */
    display() {
        let str = "";
        let errArr = [];

        if(this.any()) {
            for(let field in this.errors) {
                if(this.errors[field]) {
                    errArr.push(this.errors[field])
                }
            }

            errArr = _.uniq(errArr);

            str += "<div>";

            _.each(errArr, err => {
                str += `<div>${err}</div>`
            })

            str += "</div>";
        }

        return str;
    }
}
