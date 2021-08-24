const router = require('express').Router();
let PumperRecord = require('../models/pumpers_records.model');

router.route('/').get((req, res) => {
  PumperRecord.find()
    .then(pumpersRecord => res.json(pumpersRecord))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const pumpername = req.body.pumpername;
    const saleDate = req.body.saleDate;
    const payableAmount = req.body.payableAmount;
    const paiedAmount = req.body.paiedAmount;
    const balance = req.body.balance;
    const searchkey = req.body.searchkey;

  const newPumperRecord = new PumperRecord({
    pumpername,
    saleDate,
    payableAmount,
    paiedAmount,
    balance,
    searchkey,
  });

  newPumperRecord.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});



router.route('/date/:id').get((req, res) => {
  PumperRecord.find( {saleDate:req.params.id})
    .then(pumperRecord => res.json(pumperRecord))
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