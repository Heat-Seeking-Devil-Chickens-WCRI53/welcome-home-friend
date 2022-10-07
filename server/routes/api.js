const express = require('express');

const petController = require('../controllers/petController');
const UserController = require('../controllers/UserController');

const router = express.Router();


// Check for cookie after user signs in, display all lost pets
router.get('/', 
    UserController.checkCookie, 
    petController.getPet, 
    (req, res) => {
    return res.status(200).json(res.locals.pets) 
});

// Same as above but used for Google OAuth. No need to check for cookie
router.get('/google',
    petController.getPet, 
    (req, res) => {
    console.log(req.cookies.google_id);
    // res.send('this is your profile -' + req.user.username);
    return res.status(200).json(res.locals.pets) 
});

// Displays current user's lost pets
router.get('/user', 
    UserController.checkCookie, 
    petController.userPets, 
    (req, res) => {
    console.log(res.locals.userPets);
    return res.status(200).json(res.locals.userPets);
})

// Displays landing page's limited pet info
router.get('/landing', 
    petController.getLanding, 
    (req, res) => {
    // res.send('this is your profile -' + req.user.username);
    return res.status(200).json(res.locals.pets);
})


router.post('/pet',
    petController.getLocation,
    UserController.checkCookie,
    petController.addPet, 
    (req, res) => {
    return res.status(200).json(res.locals.newPet); 
});

router.post('/found',
    UserController.checkCookie,
    petController.foundPet,  
    (req, res) => {
    return res.status(200).json(res.locals.foundPet); 
});


router.post('/signup', 
    UserController.verifyUser, 
    UserController.createUser, 
    UserController.setCookie, 
    (req, res) => {
    console.log('in signup route');
    return res.status(200).json(res.locals.user);
});


router.post('/login', 
    UserController.loginUser, 
    UserController.setCookie, 
    (req, res) => {
    console.log('in login route')
    res.status(200).json(res.locals.user)
});

router.get('/logout', 
    UserController.logoutUser, 
    (req, res) => {
    res.status(200).json('Logged out successfully')
});

router.post('/location', petController.getLocation, (req, res) => {
    res.status(200).json('Location');
})

module.exports = router;