/* jshint esversion:6 */

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

var routes = new Schema({
    icon: {type: String, required: true},
    name: {type: String, required: true},
    vicinity: {type: String, required: true}
});


const routesSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  place: String,
  mapBD: [routes]
});


module.exports = mongoose.model('Map', routesSchema);
