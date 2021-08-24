const router = require('express').Router();
let Pumps = require('../models/pump.model');

router.route('/').get((req, res) => {
  Pumps.find()
    .then(pumps => res.json(pumps))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const fueltype = req.body.fueltype;
  const pumpname = req.body.pumpname;
  const initialreading = Number(req.body.initialreading);
  const ongoingreading = Number(req.body.ongoingreading);

  const newPumps = new Pumps({
    fueltype,
    pumpname,
    initialreading,
    ongoingreading,
  });

  newPumps.save()
  .then(() => res.json('Pump added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Pumps.findById(req.params.id)
    .then(pump => res.json(pump))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/type/:id').get((req, res) => {
  Pumps.find( {fueltype:req.params.id})
    .then(pump => res.json(pump))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Pumps.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Pumps.findById(req.params.id)
    .then(pump => {
      pump.ongoingreading = req.body.ongoingreading;

      pump.save()
        .then(() => res.json('Exercise updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;