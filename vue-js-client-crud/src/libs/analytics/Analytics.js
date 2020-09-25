/**
 * @author Lexx YungCarter
 * @email lexxyungcarter@gmail.com
 * Github:  https://github.com/lexxyungcarter
 * @modify date 2020-09-21 21:10
 */

import Base from '@/libs/requests/Base';
import Form from '@/libs/requests/Form';
const { detect } = require('detect-browser');
const browser = detect();
const platform = require('platform');

import { fields } from './AnalyticsRepository';
const routePrefix = 'analytics'

export default class Analytics extends Base {

  constructor() {
    super(fields);

    this.form = new Form(fields);

    this.saved = false;

    this.info = null;

    this.excludedUrls = [
      '/analytics'
    ];

  }

  /**
   * Get the name of the OS
   * @returns {*}
   */
  getOsName() {
    let name = platform.os

    if(typeof name == 'object') {
      name = name.family
    }

    return name
  }

  /**
   * Get the version of the OS
   * @returns {*}
   */
  getOsVersion() {
    let version = platform.os

    if(typeof version == 'object') {
      version = version.version
    } else {
      version = platform.version
    }

    return version
  }

  /**
   * get relative url
   *
   * @param url
   * @returns {*}
   */
  getRelativeUrl(url) {
    return url.replace(siteUrl, '')
  }

  /**
   * get analytics data
   * @param key
   * @param params
   */
  get(key, params = {}) {
    let url = `${routePrefix}/${key}?`;

    url += this.querifyObject(params)

    this.form.submit('get', url).then(response => {

      this.info = response;

    });

  }

  /**
   * Save new analytics data
   */
  saveAnalytic(key) {
    let url = `${routePrefix}/${key}`;
    this.saved = false;
    let data = this[key]

    this.form.submit('post', url, data).then(response => {

      this.saved = true;

    });
  }

  /**
   * log from vue-router
   * @param to
   */
  logTrafficFromRouter(to) {
    if(! this.excludedUrls.includes(to.path)) {
      this.traffic.url = to.path
      this.traffic.domain = siteUrl
      this.traffic.query = this.querifyObject(to.query)
      this.traffic.browser = browser.name
      this.traffic.os = this.getOsName()
      this.traffic.os_version = this.getOsVersion()

      this.saveAnalytic('traffic')
    }
  }

  /**
   * log query term
   * @param term
   * @param queryString
   */
  logQuery(term, queryString = {}) {
    if(term) {
      this.query.url = this.getRelativeUrl(window.location.href)
      this.query.domain = siteUrl
      this.query.query_string = this.querifyObject(queryString)
      this.query.term = term

      this.saveAnalytic('query')
    }
  }

}