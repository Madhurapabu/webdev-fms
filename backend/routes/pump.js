const router = require('express').Router();
let Pumps = require('../models/pump.model');

router.route('/').get((req, res) => {
  Pumps.find()
    .then(pumps => res.json(pumps))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newPumps = new Pumps({
    username,
    description,
    duration,
    date,
  });

  newPumps.save()
  .then(() => res.json('Exercise added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Pumps.findById(req.params.id)
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
      pump.username = req.body.username;
      pump.description = req.body.description;
      pump.duration = Number(req.body.duration);
      pump.date = Date.parse(req.body.date);

      pump.save()
        .then(() => res.json('Exercise updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;