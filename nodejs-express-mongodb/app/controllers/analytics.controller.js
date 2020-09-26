const db = require("../models");
const Traffic = db.traffic;
const Query = db.queries;
const requestCountry = require('request-country');

/**
 * Retrieve all items from the database.
 * @param {*} req
 * @param {*} res
 */
exports.index = (req, res) => {
  switch(req.params.key) {
    case 'traffic':
      require('../library/analytics/traffic')(req, res)
      break;

    case 'browser-stats':
      require('../library/analytics/browser-stats')(req, res)
      break;

    case 'top-pages':
      require('../library/analytics/top-pages')(req, res)
      break;

    case 'queries':
      require('../library/analytics/queries')(req, res)
      break;

    case 'top-queries':
      require('../library/analytics/top-queries')(req, res)
      break;

    case 'top-countries':
      require('../library/analytics/top-countries')(req, res)
      break;

    case 'top-os':
      require('../library/analytics/top-os')(req, res)
      break;

    default:
      break;
  }

};

// Create and Save a new item
exports.create = (req, res) => {
  let country, item;

  switch(req.params.key) {
    case 'traffic':
      country = requestCountry(req);
      !country ? country = null : null;

      item = new Traffic({
        domain: req.body.domain,
        url: req.body.url,
        query: req.body.query,
        browser: req.body.browser,
        os: req.body.os,
        os_version: req.body.os_version,
        ip: req.ip,
        country: country,
      });

      // Save item in the database
      item
        .save(item)
        .then(data => {
          res.send({ message: req.params.key + " recorded" });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || `Some error occurred while saving ${req.params.key}.`
          });
        });
      break;

    case 'query':
      country = requestCountry(req);
      !country ? country = null : null;

      item = new Query({
        domain: req.body.domain,
        url: req.body.url,
        query_string: req.body.query_string,
        term: req.body.term,
        ip: req.ip,
        country: country,
      });

      // Save item in the database
      item
        .save(item)
        .then(data => {
          res.send({ message: req.params.key + " recorded" });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || `Some error occurred while saving ${req.params.key}.`
          });
        });
      break;

    default:
      break;
  }

};
