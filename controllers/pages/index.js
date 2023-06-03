const router = require('express').Router();
const path = require('path');
const withAuth = require('../../middleware/auth');

const dashboard = require('./dashboard');
const home = require('./home');
const login = require('./login');
const signUp = require('./sign-up');

router.use('/dashboard', withAuth, dashboard);

router.use('/home', withAuth, home);

router.use('/login', login);

router.use('/sign-up', signUp);

router.get('/', (req, res) => {
  return res.render('welcome');
});

module.exports = router;