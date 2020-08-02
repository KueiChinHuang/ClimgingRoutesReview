const mongoose = require('mongoose');

const possibleColors = ['Blue', 'Green', 'Red', 'Black'];
const possibleLocations = ['Wall_A', 'Wall_B', 'Wall_C', 'Wall_D'];
const possibleScores = [0, 1, 2, 3, 4, 5];

const ReviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  color: {
    type: String,
    enum: possibleColors,
    default: 'Blue',
    require: true
  },
  location: {
    type: String,    
    enum:  possibleLocations,
    default: 'Wall_A',
    require: true
  },
  score: {
    type: Number,
    enum: possibleScores,
    default: 5,
    require: true
  },
  difficulty: {
    type: String,
    require: true
  },
  description: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    getters: true
  }
});

ReviewSchema.statics.colorOptions = () => possibleColors;
ReviewSchema.statics.locationOptions = () => possibleLocations;
ReviewSchema.statics.scoreOptions = () => possibleScores;

ReviewSchema.virtual('title')
  .get(function () {
    return `${this.location} ${this.color} ${this.difficulty}`
  })

ReviewSchema.index({'$**': 'text'});

ReviewSchema.virtual('synopsis')
  .get(function () {
    const post = this.description;
    return post
      .replace(/(<([^>]+)>)/ig, "")
      .substring(0, 250);
  });

module.exports = mongoose.model('Review', ReviewSchema);