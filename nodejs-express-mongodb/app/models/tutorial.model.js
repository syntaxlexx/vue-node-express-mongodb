/**
 * This Mongoose Model represents tutorials collection in 
 * MongoDB database. These fields will be generated automatically 
 * for each Tutorial document: _id, title, description, published, 
 * createdAt, updatedAt, __v.
 */
module.exports = (mongoose, mongoosePaginate) => {
  var schema = mongoose.Schema(
    {
      title: String,
      description: String,
      published: Boolean
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  schema.plugin(mongoosePaginate);

  return mongoose.model("Tutorial", schema);
};
