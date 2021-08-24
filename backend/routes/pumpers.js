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
  const totalSale = req.body.totalSale;
  const prevSale = req.body.prevSale;

  const newPumper = new Pumper({
    firstname,
    lastname,
    gender,
    dob,
    address,
    nic,
    contactnumber,
    username,
    totalSale,
    prevSale,
  });

  newPumper.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/updatepumper/:id').post((req, res) => {
  Pumper.findBy({username:req.params.id})
    .then(pumper => {
      
      pumper.totalSale = (req.body.price);
      pumper.save()
        .then(() => res.json('Price updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;