const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const Schema = mongoose.Schema;

// create schema
const teamSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
    },
    name2: {
      type: String,
      required: false,
    },
    color: {
      type: String,
      required: true,
      unique: false,
    },
    size: {
      type: String,
      required: true,
      unique: false,
    },
  },
  {
    timestamps: true,
  }
);

// use pagination plugin
teamSchema.plugin(mongoosePaginate);

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
