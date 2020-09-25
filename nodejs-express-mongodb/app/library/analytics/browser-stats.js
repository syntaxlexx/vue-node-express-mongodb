const db = require("../../models");
const Traffic = db.traffic;

module.exports = (req, res) => {
  Traffic
    .aggregate([
      {
        $group: {
          _id: "$browser",
          count: { $sum: 1}
        }
      }
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
