const router = require('express').Router();
let Pumper = require('../models/pumpers.model');

router.route('/').get((req, res) => {
  Pumper.find()
    .then(pumpers => res.json(pumpers))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const name = req.body.name;

  const newPumper = new Pumper({name});

  newPumper.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;