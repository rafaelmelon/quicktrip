/* jshint esversion:6 */

const express = require('express');
const passport = require('passport');

// Require Custom Middleware
//const mapChecker = require('../middleware/mapChecker');

const User = require('../models/user-model');
const Place = require('../models/user-routes');

const mapRoutes = express.Router();


mapRoutes.get('/place', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.json({ message: 'This is a private message' });
    return;
  }

  res.status(403).json({ message: 'Unauthorized' });
});

mapRoutes.post('/place',  (req, res, next) => {




  const { user, place, mapBD } = req.body;
  const placeOb = new Place({
    user,
    place,
    mapBD
  });
  console.log(placeOb);
  placeOb.save((error, placeObj) => {
      if (error) { next(error); }
      res.status(200).json({ message: 'Map save' });
      // const user = User.findById(req.user._id, (error, user) => {
      //     if (error) { return next(error); }
      //     user.usermap = placeObj._id;
      //     user.save((error) => {
      //       if (error) {
      //         return next(error);
      //       }
      //       res.status(200).json({ message: 'Map save' });
      //     });
      // });
  });
});

module.exports = mapRoutes;
