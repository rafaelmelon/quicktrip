/* jshint esversion:6 */

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const routesSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  place: String,
  mapBD: [{ icon: 'string', name: 'string', vicinity: 'string' }]
});


module.exports = mongoose.model('Route', routesSchema);
