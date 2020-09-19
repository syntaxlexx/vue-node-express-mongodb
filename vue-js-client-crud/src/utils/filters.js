/**
 * Created by PhpStorm.
 * Author:  Lexx YungCarter
 * Github:  https://github.com/lexxyungcarter
 * Date: 2020-06-26
 * Time: 01:45
 */

import Vue from 'vue';
// import moment from 'moment';
var numeral = require("numeral");
var pluralize = require('pluralize');

Vue.filter("numberFormat", function (value) {
    return numeral(value).format("0,0.00"); // becomes 1,000.00 | displaying other groupings/separators is possible, look at the docs http://numeraljs.com/
});

Vue.filter("numberFormatInt", function (value) {
    return numeral(value).format("0,0"); // becomes 1,000 | displaying other groupings/separators is possible, look at the docs http://numeraljs.com/
});

Vue.filter("numberAbbreviate", function (value) {
    let number = value;
    let SI_POSTFIXES = ["", "k", "M", "G", "T", "P", "E"];

    // what tier? (determines SI prefix)
    var tier = Math.log10(Math.abs(number)) / 3 | 0;

    // if zero, we don't need a prefix
    if(tier == 0) return number;

    // get postfix and determine scale
    var postfix = SI_POSTFIXES[tier];
    var scale = Math.pow(10, tier * 3);

    // scale the number
    var scaled = number / scale;

    // format number and add postfix as suffix
    var formatted = scaled.toFixed(1) + '';

    // remove '.0' case
    if (/\.0$/.test(formatted))
    	formatted = formatted.substr(0, formatted.length - 2);

    return formatted + postfix;
});

// capitalize every word in a sentence
Vue.filter('capitalize', function (value) {
    if (!value) return '';
    return value.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
});

// capitalize the first word in a string
Vue.filter('ucwords', function (value) {
    if (!value) return '';
    value = value.toString();
    return `${value.substr(0, 1).toUpperCase()}${value.slice(1)}`;
});

Vue.filter('strtoupper', function (value) {
    if (!value) return '';
    return value.toString().toUpperCase();
});

Vue.filter('strtolower', function (value) {
    if (!value) return '';
    return value.toString().toLowerCase();
});

Vue.filter('acronym', function (value) {
    if (!value) return '';
    var matches = value.match(/\b(\w)/g); // ['J','S','O','N']
    return matches.join(''); // JSON
});

Vue.filter('initials', function (value) {
    if (!value) return '';
    var matches = value.match(/\b(\w)/g); // ['J','S','O','N']
    return matches.join(''); // JSON
});

Vue.filter('plural', function (value) {
    if (!value) return '';
    return pluralize.plural(value)
});

Vue.filter('singular', function (value) {
    if (!value) return '';
    return pluralize.singular(value)
});

Vue.filter('pluralize', function (value, counter) {
    if (!value) return '';

    if(counter < 2 && counter > 0)
        return pluralize.singular(value)

    return pluralize.plural(value)
});

Vue.filter('glimpse', function (value) {
    if (!value) return '';
    return value.substring(0, 20);
});

Vue.filter('two_digits', (value) => {
    if (value < 0) {
        return '00';
    }
    if (value.toString().length <= 1) {
        return `0${value}`;
    }
    return value;
});

Vue.filter('stripHtml', (value) => {
    if (!value) return '';
    // return value.replace(/<\/?[^>]+>/ig, " ");
    return value.replace(/<\/?[^>]+(>|$)/g, "");
});

/**
 * yourString => Your String
 */
Vue.filter('camelCaseToSentenceCase', function (value) {
    value = value.replace(/([A-Z])/g, " $1");
    return value.charAt(0).toUpperCase() + value.slice(1); // capitalize the first letter - as an example.
});

/**
 * convert snake case to sentence case, capitalizing all words
 * eg 'your_string' => 'Your string'
 */
Vue.filter('snakeCaseToSentenceCase', function (value) {
    value = value.replace(/(_)/g, " ");
    value = value.replace(/([A-Z])/g, " $1");
    return value.charAt(0).toUpperCase() + value.slice(1); // capitalize the first letter - as an example.
});

/**
 * convert snake case to sentence case, capitalizing all words
 * eg 'your_string' => 'Your String'
 */
Vue.filter('snakeCaseToSentenceCaseCapitalizeWords', function (value) {
    value = value.replace(/(_)/g, " ");
    return value.replace(/\b\w/g, function (l) { return l.toUpperCase() });
});

/**
 * convert snake case to sentence case, capitalizing all words
 * eg 'yourString' => 'Your String'
 */
Vue.filter('camelCaseToSentenceCaseCapitalizeWords', function (value) {
    value = value.replace(/([A-Z])/g, " $1");
    return value.replace(/\b\w/g, function (l) { return l.toUpperCase() });
});

/**
 * convert kebab case to sentence case, capitalizing all words
 * eg 'your-string' => 'Your String'
 */
Vue.filter('kebabCaseToSentenceCaseCapitalizeWords', function (value) {
    value = value.replace(/-([a-z])/g, function (g) {
        return g[1].toUpperCase();
    });
    value = value.replace(/([A-Z])/g, " $1");
    return value.replace(/\b\w/g, function (l) { return l.toUpperCase() });
});

/**
 * 'your-string' => 'YourString'
 */
Vue.filter('kebabCaseToPascalCase', function (value) {
    value = value.replace(/-([a-z])/g, function (g) {
        return g[1].toUpperCase();
    });
    value = value.replace(/([A-Z])/g, "$1");
    return value.replace(/\b\w/g, function (l) { return l.toUpperCase() });
});

/**
 * slugify a url
 * <input type="text" v-model="name"/>
 * <input type="text" value="{{ $data.name | slugify }}" />
 * <pre>{{ $data | json }}</pre>
 *
 * or call the filter inside a method too!
 * typedName(value){
 *     if(value) {
 *         this.department.slug = this.$options.filters.slugify(value);
 *      }
 *  }
 */
Vue.filter('slugify', function(value) {
    value = value.replace(/^\s+|\s+$/g, ''); // trim
    value = value.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
    var to   = "aaaaaeeeeeiiiiooooouuuunc------";
    for (var i=0, l=from.length ; i<l ; i++) {
        value = value.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    value = value.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes

    return value;
});
