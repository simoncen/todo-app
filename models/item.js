const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let itemSchema = new Schema({
    description: {
      type: String,
      required: true
    },
    completed: {
      type: Boolean,
      required: true
    },
    listId: {
      type: Schema.Types.ObjectId,
      ref: "List"
    }
}, {
  toJSON: {
    transform: function (doc, ret) { // document and return to, keep it the same as frontend
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v; // delete the version
    }
  }
});


module.exports = mongoose.model('Item', itemSchema);
