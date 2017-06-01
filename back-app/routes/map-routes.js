/* jshint esversion:6 */

const express    = require('express');
const passport   = require('passport');
const bcrypt     = require('bcrypt');

const User = require('../models/user-model');
const Route = require('../models/user-routes');
const Place = require('../models/user-places');

const mapRoutes = express.Router();

mapRoutes.post('/route',  (req, res, next) => {
  const { user, place, time, type, mapBD } = req.body;
  const routeOb = new Route({
    user,
    place,
    time,
    type,
    mapBD
  });
  routeOb.save((error, objRoute) => {
    if (error) {next(error);}
    res.status(200).json(objRoute);
  });
});

mapRoutes.post('/route/delete/:id', (req, res, next) => {
  const id = req.params.id;
  Route.findByIdAndRemove(id, (err, product) => {
    if (err){ return next(err); }
    return res.json({
      message: 'Route deleted'
    });
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

mapRoutes.post('/place/delete/:id', (req, res, next) => {
  const id = req.params.id;
  Place.findByIdAndRemove(id, (err, product) => {
    if (err){ return next(err); }
    return res.json({
      message: 'Route deleted'
    });
  });
});

mapRoutes.get('/place/:id', (req, res, next) => {
  Place.find({user : req.params.id}).populate('user').exec((error, place)=>{
    if (error) { next(error); }
    res.json(place);
  });
});

mapRoutes.post('/notes',(req, res, next)=>{
  Route.update({ _id: req.body.id }, { $push: { comment: req.body.note } }).exec((error, route)=>{
    if (error) { next(error); }
    res.status(200).json(route);
  });
});

module.exports = mapRoutes;
