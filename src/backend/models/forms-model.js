const { Schema, model } = require("mongoose");

const TokenSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = model("Token", TokenSchema);
