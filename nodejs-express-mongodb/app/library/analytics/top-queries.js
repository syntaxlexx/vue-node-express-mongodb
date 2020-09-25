const db = require("../../models");
const Query = db.queries;

module.exports = (req, res) => {
  const { page, size, search } = req.query;

  Query
    .aggregate([
      {
        $sortByCount: "$term",
      },
      {$limit: parseInt(size)}
    ])
    .then((data) => {
      res.send({data: data});
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `Some error occurred while retrieving ${req.params.key}.`,
      });
    });
}
