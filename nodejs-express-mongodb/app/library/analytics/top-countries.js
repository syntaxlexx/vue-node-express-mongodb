const db = require("../../models");
const Traffic = db.traffic;

module.exports = (req, res) => {
  const { page, size, search } = req.query;

  Traffic
    .aggregate([
      {
        $sortByCount: "$country",
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
