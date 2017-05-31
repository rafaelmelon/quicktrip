/* jshint esversion:6 */

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const placesSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  name: String,
  location: String
});

module.exports = mongoose.model('Place', placesSchema);
