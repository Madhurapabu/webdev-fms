const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
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
  const password = req.body.password;


  const newUser = new User({
    firstname,
    lastname,
    gender,
    dob,
    address,
    nic,
    contactnumber,
    username,
    password,
  });

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;