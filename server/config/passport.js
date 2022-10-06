// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20');
// const db = require('../models/models');

// passport.serializeUser((user, done) => {
//   console.log('in passport.serializeUser');
//   console.log(user);
//   done(null, user.id)
// })


// passport.deserializeUser((id, done) => {
//   console.log('in passport.deserializeUser');
//   console.log(id);
//   db.query('SELECT * FROM google_users WHERE id = $1', [id])
//     .then(data => {
//       const user = data.rows[0];
//       done(null, user);
//     })
// })

// passport.use(new GoogleStrategy({
//   // options for google strategy
//   clientID: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   callbackURL: '/auth/google/callback'
// }, (accessToken, refreshToken, profile, done) => {
//   // passport callback function
//   console.log('passport callback funciton');
//   // console.log(profile);
//   console.log(profile.id);
//   console.log(profile.displayName);
//   db.query('SELECT * FROM google_users WHERE google_id = $1', [profile.id])
//     .then(data => {
//       // if user exists in database
//       if (data.rows.length !== 0) {
//         console.log('user is');
//         console.log(data.rows[0]);
//         done(null, data.rows[0]);
//       } else {
//         // create new user into database
//         db.query('INSERT INTO google_users (username, google_id) VALUES ($1, $2) RETURNING *', [profile.displayName, profile.id])
//           .then(data => {
//             console.log('new user created:');
//             console.log(data.rows[0]);
//             done(null, data.rows[0]);
//           })
//       }
//     })
// })
// )