// INSTRUCTIONS
/*
  Create a new resource model that uses the User
  as an associative collection (examples):
  - User -> Books
  - User -> Reservation

  Your model must contain at least three attributes
  other than the associated user and the timestamps.

  Your model must have at least one helpful virtual
  or query function. For example, you could have a
  book's details output in an easy format: book.format()
*/

const mongoose = require('mongoose');

const possibleColors = ['Blue', 'Green', 'Red', 'Black'];
const possibleLocations = ['Wall A', 'Wall B', 'Wall C', 'Wall D'];
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
    default: 'Wall A',
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

ReviewSchema.virtual('synopsis')
  .get(function () {
    const post = this.description;
    return post
      .replace(/(<([^>]+)>)/ig, "")
      .substring(0, 250);
  });

module.exports = mongoose.model('Review', ReviewSchema);