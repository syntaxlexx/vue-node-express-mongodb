/**
 * Created by PhpStorm.
 * User: lexxyungcarter
 * Date: 2020-09-14
 * Time: 02:56
 */

export default class Search{
    constructor(field) {
        this.term = null;

        this.field = field;

        this.results = [];

        this.resultsData = [];

        this.loading = false;

        this.noData = "";
    }

    /**
     * makes the defaults, default
     */
    reset() {
        this.results = [];

        this.resultsData = [];

        this.loading = false;

        this.noData = "";
    }

}
