const router = require('express').Router();
let Pumper = require('../models/pumpers.model');

router.route('/').get((req, res) => {
  Pumper.find()
    .then(pumpers => res.json(pumpers))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const gender = req.body.gender;
  const dob = Date.parse(req.body.dob);
  const address = req.body.address;
  const nic =  req.body.nic;
  const contactnumber = Number(req.body.contactnumber);
  const username = req.body.username;

  const newPumper = new Pumper({
    firstname,
    lastname,
    gender,
    dob,
    address,
    nic,
    contactnumber,
    username,
  });

  newPumper.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;