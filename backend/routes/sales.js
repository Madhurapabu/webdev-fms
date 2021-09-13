const router = require('express').Router();
let Sale = require('../models/sales.model');

router.route('/').get((req, res) => {
  Sale.find()
    .then(sales => res.json(sales))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {

  const pumpname =  req.body.pumpname;
  const fueltype = req.body.fueltype;
  const ongoingreading = Number(req.body.ongoingreading);
  const sales_liters = Number(req.body.sales_liters);
  const sales = Number(req.body.sales);
  const assign_pumpman = req.body.assign_pumpman;
  const payablevalue = req.body.payablevalue;
  const dateOfSales = Date.parse(req.body.dateOfSales);
  const keyValue = req.body.keyValue;
  const credited = req.body.credited;
  const newSale = new Sale({
    pumpname,
    fueltype,
    ongoingreading,
    sales_liters,
    sales,
    assign_pumpman,
    payablevalue,
    dateOfSales,
    keyValue,
    credited,
  });

  newSale.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Sale.findById(req.params.id)
    .then(sales => res.json(sales))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/pumpname/:id').get((req, res) => {
  Sale.find( {pumpname:req.params.id})
    .then(sales => res.json(sales))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/date/:id').get((req, res) => {
  Sale.find( {dateOfSales:req.params.id} )
    .then(sales => res.json(sales))
    .catch(err => res.status(400).json('Error: ' + err));
});   

router.route('/dateperson').post((req, res) => {

  const dateOfSales = req.body.dateOfSales;
  const assign_pumpman =  req.body.assign_pumpman;
  
  Sale.find({assign_pumpman:assign_pumpman,dateOfSales:dateOfSales})
    .then(sales => res.json(sales))
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;