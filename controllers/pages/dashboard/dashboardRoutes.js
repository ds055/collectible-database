const router = require('express').Router();
const { User } = require('../../../models');
const getRecentItems = require('../../../models/getRecentItems');


// Use withAuth middleware to prevent access to route
router.get('/', async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      raw: true,
      nest: true,
    });

    // Fetch recent items
    const recentItems = await getRecentItems();


    res.render('dashboard', {
      ...userData,
      recentItems,
      logged_in: req.session.logged_in
    });

    console.log(userData)
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
