const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let itemSchema = require('./item').schema;
let listSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  items: [itemSchema],
  userId: { // every single group of lists will be put under a user, the specific user is queried
    type: Schema.Types.ObjectId,
    ref: "User"
  }
}, {
  toJSON: { // toJSON and transform are the APIs of mongoose
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id; // delete is a keyword from javascript
      delete ret.__v;
    }
  }
});


module.exports = mongoose.model('List', listSchema);
