const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const Schema = mongoose.Schema;

// create schema
// prettier-ignore
const teamSchema = new Schema(
  {
    name: { type: String, required: true },
    name2: { type: String },
    color: { type: String, unique: false },
    size: { type: String, unique: false },
    axies: [{id:Number, position:Number}],
    createdBy: {name:String, address:String},
  },
  {
    timestamps: true,
  }
);

// use pagination plugin
teamSchema.plugin(mongoosePaginate);

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
