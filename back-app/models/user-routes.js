/* jshint esversion:6 */

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const routesSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  place: String,
  mapDB: 'object'
});

module.exports = mongoose.model('UserMap', routesSchema);
