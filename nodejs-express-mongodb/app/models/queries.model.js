/**
 * Analytics subsegment to collect page queries
 *
 * @param mongoose
 * @param mongoosePaginate
 * @returns {*}
 */
module.exports = (mongoose, mongoosePaginate) => {
  var schema = mongoose.Schema(
    {
      domain: {type: String, required: true },
      url: {type: String, required: true },
      query_string: String,
      term: {type: String, required: true },
      ip: {type: String, required: true },
      country: {type: String },
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  schema.plugin(mongoosePaginate);

  return mongoose.model("Query", schema);
};
