const db = require('../models/models');
const axios = require('axios');
const petController = {};

petController.getLanding = (req, res, next) => {
  db.query('SELECT pet_name, image_url FROM animals;')
    .then(data => {
      console.log(data);
      res.locals.pets = data.rows;
      return next();
    })
    .catch(err => next({
      log: 'Express error in petController.getLanding',
      status: 400,
      message: {
        err: `petController.getLanding: ERROR: ${err}`
      }
    }))
};

petController.getPet = (req, res, next) => {
  //use client in here -> might be using query here ?
  // console.log('in petController.getPet');
  // console.log(req.user);
  // get google_id from req.cookies
  // console.log(req.cookies.google_id);
  db.query('SELECT * FROM animals')
    .then(data => {
      res.locals.pets = data.rows;
      return next();
    })
    .catch(err => next({
      log: 'Express error in petController.getPet',
      status: 400,
      message: {
        err: `petController.getPet: ERROR: ${err}`
      }
    }))
};

petController.userPets = (req, res, next) => {
  const { user_id } = res.locals.user;
  // console.log('in petController.userPets');
  // console.log(req.user.google_id);
  db.query('SELECT * FROM animals WHERE user_id = $1', [user_id])
    .then(data => {
      res.locals.userPets = data.rows;
      return next();
    })
    .catch(err => next({
      log: 'Express error in petController.userPets',
      status: 400,
      message: {
        err: `petController.userPets: ERROR: ${err}`
      }
    }))
}

petController.getLocation = (req, res, next) => {
  const { street_address, city, state } = req.body;

  // Make an API call to this url to convert street_address, city, state to latitude/longitude
  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${street_address},+${city},+${state}&key=AIzaSyBHLCkdnOimaN74IGqKOJrFAXslOygEJqI`)
    .then(data => {
      res.locals.location = data.data.results[0].geometry.location
      console.log(res.locals.location);
      next();
    })
    .catch(err => console.log(err));
}


petController.addPet = (req, res, next) => {
  // getting req.body data of all input
  // name and breed required
  // address or user_address???
  const {pet_name, owner, address, eye_color, gender, image_url, fur_color, breed } = req.body;
  // const { user_id } = res.locals.user;
  const { lat, lng } = res.locals.location;
  console.log(lat)
  console.log(lng)
  
  const insertChar ="INSERT INTO animals (user_id, pet_name, owner, user_address, breed, eye_color, gender, image_url, fur_color, status, lat, lng) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *"
  // replace 1 with user_id later
  const value = [1, pet_name, owner, address, breed, eye_color, gender, image_url, fur_color, false, lat, lng];

  db.query(insertChar, value)
    .then(data => {
      res.locals.newPet = data.rows;
      console.log(res.locals.newPet);
      return next();
    })
    .catch(err => next({
      log: 'Express error in petController.addPet',
      status: 400,
      message: {
        err: `petController.addPet: ERROR: ${err}`
      }
    }));
};

petController.foundPet = (req, res, next) => {
  // getting req.body data of all input
  // name and breed required
  console.log(res.locals.user);
  const { user_id } = res.locals.user;
  console.log(user_id);
  db.query('DELETE FROM animals WHERE user_id = $1 RETURNING *;', [user_id])
    .then(data => {
      res.locals.foundPet = data.rows;
      return next();
    })
    .catch(err => next({
      log: 'Express error in petController.foundPet',
      status: 400,
      message: {
        err: `petController.foundPet: ERROR: ${err}`
      }
    }))
};

module.exports = petController;