const db = require('../models/models');
const UserController = {};


// during signup, checks if username is already taken
UserController.verifyUser = (req, res, next) => {
  const { username } = req.body;
  db.query('SELECT * FROM users WHERE username = $1', [username])
    .then(data => {
      if (data.rows.length > 0) {
        console.log('Username already taken');
        return next({
          log: 'Express error in userController.verifyUser',
          status: 400,
          message: {
            err: 'Username already taken'
          }
        })
      }
      next();
    })
    .catch(err => next({
      log: 'Express error in userController.verifyUser',
      status: 400,
      message: {
        err: `UserController.verifyUser: ERROR: ${err}`
      }
    }))
}


// during signup, stores new username/pw to db
UserController.createUser = (req, res, next) => {
  const { username, password, owner, phone_number, street_address, city, state } = req.body;
  db.query('INSERT INTO users (username, password, owner, phone_number, street_address, city, state) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [username, password, owner, phone_number, street_address, city, state])
    .then(data => {
      
      res.locals.user = data.rows[0];
      return next();
    })
    .catch(err => next({
      log: 'Express error in userController.createUser',
      status: 400,
      message: {
        err: `UserController.createUser: ERROR: ${err}`
      }
    }))
}


// during login, checks username/pw 
UserController.loginUser = (req, res, next) => {
  const { username, password } = req.body;
  db.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password])
    .then(data => {
      if (data.rows.length === 0) {
        return next({
          log: 'Express error in userController.loginUser',
          status: 400,
          message: {
            err: 'Wrong username or password'
          }
        });
      } else {
        res.locals.user = data.rows[0];
        next();
      }
    })
}


// upon successful login/signup, creates a cookie and stores session in db
UserController.setCookie = (req, res, next) => {
  const { user_id } = res.locals.user;
  const cookie_id = Math.random().toString();
  res.cookie('SSID', cookie_id);
  db.query('INSERT INTO sessions (cookie, user_id) VALUES ($1, $2) RETURNING *', [cookie_id, user_id])
    .then(data => {
      return next();
    })
    .catch(err => next({
      log: 'Express error in userController.setCookie',
      status: 400,
      message: {
        err: `UserController.setCookie: ERROR: ${err}`
      }
    }))
}

// when a person enter website, landing page first entry point
// will contain GET /landmark


// in a case that cookie is valid, route to main page
// if not, display GET /landmark

// first entry point as the main page, GET '/api/
// if getting unauthorized response, frontend will redirect to landing page
// which will have a component that makes GET /landmark


// checks if user has pre-existing session
UserController.checkCookie = (req, res, next) => {
  console.log(req.cookies.SSID);
  db.query('SELECT * FROM sessions WHERE cookie = $1', [req.cookies.SSID])
    .then(data => {
      // console.log(data.rows);
      if (data.rows.length === 0) {
        return res.status(401).json('Unauthorized');
      }
      res.locals.user = data.rows[0];

      return next();
    })
    .catch(err => next({
      log: 'Express error in userController.checkCookie',
      status: 400,
      message: {
        err: `UserController.checkCookie: ERROR: ${err}`
      }
    }))
}


// during logout, deletes cookie 
UserController.logoutUser = (req, res, next) => {
  const cookie_id = req.cookies.SSID;
  res.clearCookie('SSID');
  db.query('DELETE FROM sessions WHERE cookie = $1', [cookie_id])
    .then(data => {
      console.log(data)
      next();
    })
    .catch(err => next({
      log: 'Express error in userController.logoutUser',
      status: 400,
      message: {
        err: `UserController.logoutUser: ERROR: ${err}`
      }
    }))
}

UserController.checkGoogleAuth = (req, res, next) => {
  if (!req.user) {
    return res.send('going to login page');
  } else {
    return next();
  }
}


module.exports = UserController;