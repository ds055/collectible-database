const router = require('express').Router();
const path = require('path');
const withAuth = require('../../middleware/auth');

const profile = require('./profile');
const home = require('./home');
const login = require('./login');
const signUp = require('./sign-up');
const collections = require('./collection')

router.use('/profile', withAuth, profile);

router.use('/collection', withAuth, collections)

router.use('/home', withAuth, home);

router.use('/login', login);

router.use('/sign-up', signUp)

router.get('/', (req, res) => {
  return res.render('welcome');
});

module.exports = router;