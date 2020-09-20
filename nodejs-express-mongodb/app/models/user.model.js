module.exports = (mongoose, mongoosePaginate) => {
  var schema = mongoose.Schema(
    {
      username: String,
      email: String,
      password: String,
      gender: String,
      phone: String,
      roles: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Role"
        }
      ]
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  schema.plugin(mongoosePaginate);

  return mongoose.model("User", schema);
}
