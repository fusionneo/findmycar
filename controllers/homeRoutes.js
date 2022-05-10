const router = require('express').Router();
const { Project, User } = require('../models');
const withAuth = require('../utils/auth');
const { getRecalls } = require('../utils/nhtsa_api');
const nhtsa = require('../utils/nhtsa_api');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const projectData = await Project.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

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

router.get('/project/:id', async (req, res) => {
  try {
    const projectData = await Project.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const project = projectData.get({ plain: true });

    res.render('project', {
      ...project,
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
      include: [{ model: Project }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
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
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

router.get('/recalls', async (req, res) => {

  res.render('recalls');
});

router.post('/recalls/results', async (req, res) => {
  try {
    const recallsResults = await nhtsa.getRecalls(req.body['recall-make'], req.body['recall-model'], req.body['recall-year']);
console.log(recallsResults);
     res.render('recalls-results', {
      recallsResults
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/safety-ratings', async (req, res) => {

  res.render('safety-ratings');
});

router.post('/safety-ratings/vehicles', async (req, res) => {
  try {
    console.log(req.body);
    const vehicles = await nhtsa.getVehicleId(req.body['year'], req.body['make'], req.body['model']);
console.log(vehicles)
     res.render('safety-ratings-vehicles', {
      vehicles
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/safety-ratings/:vehicleId', async (req, res) => {
  try {
    const safetyRatings = await nhtsa.getSafetyRatings(req.params.vehicleId);

     res.render('safety-ratings-results', {
      safetyRatings
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
