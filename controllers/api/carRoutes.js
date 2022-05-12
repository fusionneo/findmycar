const router = require('express').Router();
const { Op, Sequelize } = require("sequelize");
const { Cars } = require('../../models');

router.get('/search', async (req, res) => {
  try {
    // Poll our database.
    // Limit results to 5 and randomize order.
    const carData = await Cars.findAll({ 
      order: Sequelize.literal('rand()'), 
      limit: 5,
      where: {
        Year: {
          [Op.gte]: req.query.year
        },
        passengerCapacity: {
          [Op.gte]: req.query.passenger
        },
        MSRP: {
          [Op.gte]: req.query.msrp
        },
      },
    })
    console.log(carData)

    // Serialize data so the template can read it
    const cars = carData.map((cars) => cars.get({ plain: true }));

    
    res.status(200).json(cars);
  } catch (err) {
    res.status(400).json(err);
  }

});
router.get('/', async (req, res) => {
  try {
    const carData = await Cars.findAll();

    // Serialize data so the template can read it
    const cars = carData.map((cars) => cars.get({ plain: true }));

    res.status(200).json(cars);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
