const router = require('express').Router();
const { Cars, User } = require('../models');
const withAuth = require('../utils/auth');
const nhtsa = require('../utils/nhtsa_api');
const axios = require('axios');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const projectData = await Cars.findAll();

    // Serialize data so the template can read it
    const projects = projectData.map((project) => project.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      projects, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });

    const user = userData.get({ plain: true });

    res.render('homepage', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('signup');
})

router.get('/recalls', async (req, res) => {

  res.render('recalls', { 
    logged_in: req.session.logged_in 
  });
});

router.get('/car-search', withAuth, async (req, res) => {

  res.render('car-search', { 
    logged_in: req.session.logged_in 
  });
});

router.post('/recalls/results', async (req, res) => {
  try {
    const recallsResults = await nhtsa.getRecalls(req.body['recall-make'], req.body['recall-model'], req.body['recall-year']);
     res.render('recalls-results', {
      recallsResults,
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/safety-ratings', async (req, res) => {

  res.render('safety-ratings', {
    logged_in: req.session.logged_in 
  });
});

router.get('/safety-ratings/:vehicleId', async (req, res) => {
  try {
    const safetyRatings = await nhtsa.getSafetyRatings(req.params.vehicleId);

     res.render('safety-ratings-results', {
      safetyRatings,
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/safety-ratings/vehicles', async (req, res) => {
  try {
    const vehicles = await nhtsa.getVehicleId(req.body['year'], req.body['make'], req.body['model']);
     res.render('safety-ratings-vehicles', {
      vehicles,
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/cars-results', async (req, res) => {
  try {
    const response = await axios.get(`https://e-frech-find-my-car.herokuapp.com/api/cars/search?passenger=${req.body["passengerCapacity"]}&msrp=${req.body["msrp"]}&year=${req.body["year"]}`);
    const cars = response.data;

    res.render('cars-results', {
      cars,
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(400).json(err);
  }

});
module.exports = router;
