const { getPaginationOptions, returnPaginated } = require('../../helpers/paginator')
const db = require("../../models");
const Query = db.queries;

module.exports = (req, res) => {
  const { page, size, search } = req.query;
  const paginatorOptions = getPaginationOptions(page, size);
  const condition = search
    ? { term: { $regex: new RegExp(search), $options: "i" } }
    : {};

  const options = {
    ...paginatorOptions,
    sort : { 'createdAt': -1 }
  }

  Query.paginate(condition, options)
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
