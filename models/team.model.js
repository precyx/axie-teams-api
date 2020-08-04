const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const Schema = mongoose.Schema;

// validations functions
const arrayLimit_3 = val => val.length <= 3;
const arrayLimit_50 = val => val.length <= 50;

// create schema
// prettier-ignore
const teamSchema = new Schema(
  {
    name: { type: String, required: true, maxlength: 30 },
    name2: { type: String, maxlength: 30 },
    axies: {
      validate: [arrayLimit_3, '{PATH} exceeds the limit of 3'],
      type: [{
      id:{type:Number, max:9100200300400500600}, 
      position:{type:Number, max:9100200300400500600},
      genes:{type:String, maxlength:240},
      image:{type:String, maxlength:360},
      parts: [{
        id:{type:String, maxlength: 120},
        name:{type:String, maxlength: 60},
        class:{type:String, maxlength: 60},
        abilities: [{
          id:{type:String, maxlength: 120},
          attack:{type:Number, max:9100200300400500600},
          defense: {type:Number, max:9100200300400500600},
          energy: {type:Number, max:9100200300400500600},
          description: {type:String, maxlength: 360},
          backgroundUrl: {type:String, maxlength: 800},
          effectIconUrl: {type:String, maxlength: 800}
        }]
      }]
    }]},
    createdBy: {
      name:{type:String, maxlength: 60}, 
      address:{type:String, maxlength: 120}
    },
    likes: {type:Number, max:9100200300400500600},
    seasons: {
      type: [{type: String, maxlength: 30}],
      validate: [arrayLimit_50, '{PATH} exceeds the limit of 50']
    },
    season: {type: String, maxlength: 30}
  },
  {
    timestamps: true,
  }
);

// use pagination plugin
teamSchema.plugin(mongoosePaginate);

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
