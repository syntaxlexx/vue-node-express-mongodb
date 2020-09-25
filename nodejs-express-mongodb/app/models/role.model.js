module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      name: {type: String , unique : true },
      description: String
    }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const findOrCreate = require('mongoose-findorcreate')
  schema.plugin(findOrCreate);

  return mongoose.model("Role", schema);
}