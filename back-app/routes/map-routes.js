/* jshint esversion:6 */

const express    = require('express');
const passport   = require('passport');
const bcrypt     = require('bcrypt');

const User = require('../models/user-model');
const Route = require('../models/user-routes');
const Place = require('../models/user-places');

const mapRoutes = express.Router();

mapRoutes.post('/route',  (req, res, next) => {
  const { user, place, time, mapBD } = req.body;
  const routeOb = new Route({
    user,
    place,
    time,
    mapBD
  });

  routeOb.save((error, objRoute) => {
    if (error) {next(error);}
    res.status(200).json(objRoute);
  });
});

mapRoutes.get('/route/:id', (req, res, next) => {
  Route.find({user : req.params.id}).populate('user').exec((error, map)=>{
    if (error) { next(error); }
    res.json(map);
  });
});



mapRoutes.post('/place',  (req, res, next) => {
  const { user, name, location, icon } = req.body;
  const placeOb = new Place({
    user,
    name,
    location,
    icon
  });
  placeOb.save((error, objPlace) => {
    if (error) {next(error);}
    res.status(200).json(objPlace);
  });
});

mapRoutes.get('/place/:id', (req, res, next) => {

  Place.find({user : req.params.id}).populate('user').exec((error, place)=>{
    if (error) { next(error); }
    res.json(place);
  });
});


module.exports = mapRoutes;
