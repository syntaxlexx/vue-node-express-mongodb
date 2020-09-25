/**
 * Analytics subsegment to collect page visits, visitors activities
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
      query: String,
      browser: String,
      os: String,
      os_version: String,
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

  return mongoose.model("Traffic", schema);
};
