const { getPaginationOptions, returnPaginated } = require('../../helpers/paginator')
const db = require("../../models");
const Traffic = db.traffic;

module.exports = (req, res) => {
  const { page, size, search } = req.query;
  const paginatorOptions = getPaginationOptions(page, size);
  const options = {
    ...paginatorOptions,
    sort : { 'createdAt': -1 }
  }
  const condition = null

  Traffic.paginate(condition, options)
    .then((data) => {
      res.send(returnPaginated(data));
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `Some error occurred while retrieving ${req.params.key}.`,
      });
    });
}
