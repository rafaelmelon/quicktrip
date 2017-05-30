/* jshint esversion:6 */

const express    = require('express');
const passport   = require('passport');
const bcrypt     = require('bcrypt');

const User = require('../models/user-model');
const Place = require('../models/user-routes');

const mapRoutes = express.Router();

mapRoutes.get('/place/:id', (req, res, next) => {

  Place.find({user : req.params._id}).populate('user').exec((error, mapBD)=>{

     if (error) { next(error); }

     res.json(mapBD);
  });

  // if (req.isAuthenticated()) {
  //   res.json({ message: 'This is a private message' });
  //   return;
  // }



  // let populatePlace;
  // console.log(req.params._id);
  // Place.find({user : req.params._id},(err,place)=>{
  //   populatePlace = new Promise((resolve)=>place.populate("user",(err,success)=>resolve(success)))
  //
  //   populatePlace.then((place)=>res.status(200).json(place))
  // });



  // .populate('user')
  // .then(plateList => {
  //   res.json(plateList);
  // })
  // .reject(err => {
  //   res.status(500).json(err);
  // });


  // res.status(403).json({ message: 'Unauthorized' });
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
    if (error) {next(error);}
    res.status(200).json({ message: 'Map save' });
  });
});

module.exports = mapRoutes;
