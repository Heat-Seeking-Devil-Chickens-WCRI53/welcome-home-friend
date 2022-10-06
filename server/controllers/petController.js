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
  console.log('in petController.getPet');
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

// petController.getLocation = (req, res, next) => {
//   const { street_address, city, state } = req.body;
//   console.log(street_address);
//   console.log(city);
//   console.log(state);
//   axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${street_address},+${city},+${state}&key=${process.env.GOOGLE_API_KEY}`)
//     .then(res => {
//       console.log(res.data);
//       res.locals.location = res.data;
//       next();
//     });
// }


petController.addPet = (req, res, next) => {
  // getting req.body data of all input
  // name and breed required
  // console.log(req.body);
  const { user_id } = res.locals.user;
  const {pet_name, phone_number, owner, address, eye_color, gender, image_url, fur_color, last_found, breed} = req.body;

  // Make an API call to this url to convert street_address, city, state to latitude/longitude
  // https://maps.googleapis.com/maps/api/geocode/json?address=${street_address},+${city},+${state}&key=AIzaSyBRacG1Uw6S2XcqqqA50dnaTRUSwiJ2Gg4`
  // `https://maps.googleapis.com/maps/api/geocode/json?address=1243 S Broadway,+Santa Ana,+CA&key=AIzaSyBRacG1Uw6S2XcqqqA50dnaTRUSwiJ2Gg4`
  
  const insertChar ="INSERT INTO animals (user_id, pet_name, owner, phone_number, address, breed, eye_color, gender, image_url, fur_color, last_found, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *"
  // replace 1 with user_id later
  const value = [user_id, pet_name, owner, phone_number, address, breed, eye_color, gender, image_url, fur_color, last_found, false];

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