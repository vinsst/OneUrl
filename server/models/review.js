const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  inputValue: {
    type: String,
    required: true,
  },
  selectedStars: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  avatar: {
    type: String,
  },
  nickname: {
    type: String,
    required: true,
  },
  ID: {
    type: String,
    required: true,
  },
  like: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  inputValueReport: [
    {
      type: String,
    },
  ],
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
