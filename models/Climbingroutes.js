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

const ClimbingrouteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  color: {
    type: String,
    enum: ['BLUE', 'GREEN', 'RED', 'BLACK'],
    default: 'BLUE',
    require: true
  },
  location: {
    type: String,    
    enum:  ['WALL_A', 'WALL_B', 'WALL_C', 'WALL_D'],
    default: 'WALL_A',
    require: true
  },
  review: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
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

ClimbingrouteSchema.virtual('title')
  .get(function () {
    return `${this.location} ${this.color} ${this.difficulty}`
  })

ClimbingrouteSchema.virtual('synopsis')
  .get(function () {
    const post = this.description;
    return post
      .replace(/(<([^>]+)>)/ig, "")
      .substring(0, 250);
  });

module.exports = mongoose.model('Climbingroute', ClimbingrouteSchema);