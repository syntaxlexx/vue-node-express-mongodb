/**
 * @author Lexx YungCarter
 * @email lexxyungcarter@gmail.com
 * Github:  https://github.com/lexxyungcarter
 * @modify date 2020-09-16 11:12
 */

window._ = require('lodash');

window.axios = require('axios');
window.axios.defaults.baseURL =
    process.env.NODE_ENV == "production"
        ? 'https://vuemongo.acelords.space/api'
        : 'http://localhost:8081/api';

// don't enable this else node POST requests will not pass body with payload
// window.axios.defaults.headers.common['Content-type'] = 'application/json';
