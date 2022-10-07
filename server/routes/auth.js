const express = require('express');
const passport = require('passport');
const router = express.Router();
const petController = require('../controllers/petController');

// auth login
router.get('/login', (req, res) => {
  res.send('login');
})

// auth with Google
router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}))

// callback route for google redirect
router.get('/google/callback', passport.authenticate('google'), (req, res) => {
  // console.log(req.user.username);
  // res.send('you reached callback URI');
  console.log('/google/callback')
  console.log(req.user)
  // put google_id to cookie
  res.cookie('google_id', req.user.google_id, { httpOnly: true });
  res.redirect('/api/google');
  // res.status(200).json(res.locals.userPets);
})

// auth logout
router.get('/logout', (req, res) => {
  res.send('logging out');
})


module.exports = router;