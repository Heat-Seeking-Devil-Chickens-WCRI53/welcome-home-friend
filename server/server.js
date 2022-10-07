const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000;
const cookieParser = require('cookie-parser');
const cors = require('cors');
const apiRouter = require('./routes/api');
//const passportSetup = require('./config/passport');
//const passport = require('passport');
//const session = require('express-session');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// app.use(session({
//   secret: 'dog cat',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: true }
// }))

// // Initialize passport 
// app.use(passport.initialize());
// app.use(passport.authenticate('session'));

// app.use('/auth', require('./routes/auth'));

// serve index.html to GET '/'
app.get('/', (req, res) => {
  return res.redirect('/api/landing');
})

app.use('/api', apiRouter);

// catch-all route handler for any requests to an unknown route
 app.use((req, res) => res.status(404).send('This is not the page you\'re looking for...'));

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost${PORT}...`)
})

module.exports = app;