
module.exports = function (mongoose) {
  //
  let userSchema = new mongoose.Schema(
    {
      ip: { type: String },
      os: { type: String },
      os_version: { type: String },
      device_id: { type: String },
      brand: { type: String },
      model: { type: String },
      type: { type: String },
      browser: { type: String },
      browser_version: { type: String },
      other_detail: { type: Object },
    },
    {
      timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
      minimize: false,
      versionKey: false,
    }
  );

  return new mongoose.model("user", userSchema, "user");
};
