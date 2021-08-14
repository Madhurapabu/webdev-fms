const router = require('express').Router();
let Prices = require('../models/prices.model');

router.route('/').get((req, res) => {
  Prices.find()
    .then(prices => res.json(prices))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Should change the variable
router.route('/add').post((req, res) => {
  const fueltype = req.body.fueltype;
  const price = Number( req.body.price);

  const newPrices = new Prices({
    fueltype,
    price,
  });

  newPrices.save()
  .then(() => res.json('Pump added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Prices.findById(req.params.id)
    .then(pump => res.json(pump))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/type/:id').get((req, res) => {
  Prices.find( {fueltype:req.params.id})
    .then(pump => res.json(pump))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Prices.findById(req.params.id)
    .then(price => {
      
      price.price = Number(req.body.price);
      price.save()
        .then(() => res.json('Price updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});




module.exports = router;