/**
 * Created by PhpStorm.
 * User: lexxyungcarter
 * Date: 2020-09-14
 * Time: 02:56
 */

export default class Base {
    constructor(fields) {
        this.setFields(fields);
    }

    /**
     * Polish the field values so that they are referenced using the this keyword
     */
    setFields(fields) {
        for(let field in fields) {
            this[field] = fields[field];
        }
    }

    /**
     * After submitting the form refresh the fields
     */
    resetFields(fields) {
        for(let field in fields) {
            if(fields[field] instanceof Array) {
                fields[field].splice(0, fields[field].length);
            } else {
                this[field] = fields[field];
            }
        }
    }

    /**
     * Get the data from the fields. This method accepts an entire class' scope and removes any unwanted values
     */
    getFields(items = []) {
        let data = Object.assign({}, this);

        delete data['form'];

        if(items.length > 0) {
            for(let field in data) {
                if(items.indexOf(field) == -1) {
                    delete data[field]
                }
            }
        }

        return data;
    }

    /**
     * Get the data from the fields. This method accepts an entire class' scope and removes any unwanted values
     */
    getFieldsExcept(trash = []) {
        trash.push('form');

        let data = Object.assign({}, this);

        trash.forEach((item) => {
            delete data[item];
        })

        return data;
    }

    /**
     * Remove errors that were loaded 0 useful when working with vuetify
     */
    correct(errors) {
        setTimeout(() => {
            errors.clear();
        }, 100);
    }

    /**
     * Format an object entries to url parameters
     *
     * @param obj
     * @returns {string}
     */
    querifyObject(obj = {}) {
        let str = ""

        Object.keys(obj).map(k => {
            if(obj.hasOwnProperty(k)) {
                str += `&${k}=${obj[k]}`;
            }
        })

        return str;
    }

}