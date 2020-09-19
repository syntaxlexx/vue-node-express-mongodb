/**
 * Created by PhpStorm.
 * User: lexxyungcarter
 * Date: 2020-09-14
 * Time: 02:56
 */

import Errors from './Errors';
import { visa } from '@/utils/Customs'

export default class Form
{
    constructor(fields) {
        this.errors = new Errors(fields);

        this.submitted = false;

        this.errorDetected = false;

        this.loading = false;
    }

    /**
     * Save the data that has been passed to the form into the database
     */
    submit(request, url, record) {
        this.loading = true;
        this.submitted = false;
        this.errors.clear();
        this.errorDetected = false;

        return new Promise((resolve, reject) => {

            let call;

            if(request == "get" || request == "delete") {
                call = axios[request](url, visa())
            } else {
                call = axios[request](url, record, visa());
            }

            call.then(({data}) => {

                resolve(data);

                this.submitted = true;

                this.loading = false;

            }).catch(({response}) => {

                this.errors.record(response.data);

                if(response.data.hasOwnProperty('exception') || response.data.hasOwnProperty('message'))
                {
                    if(! (response.data.message.length < 1 || response.data.message === "The given data was invalid.")) {
                        flash({alert: 'error', message: response.data.message})
                    }

                    if(response.data.message === "The given data was invalid.")
                    {
                        flash({alert: 'error', message: "Form validation error"})
                    }

                }
                else {
                    flash({alert: 'error', message: "An error occurred"})
                }

                reject(response.data);

                this.errorDetected = true;

                this.loading = false;

            });
        });
    }
}
