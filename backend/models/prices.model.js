const mongoose = require('mongoose');
mongoose.plugin(require('meanie-mongoose-to-json'));

const Schema = mongoose.Schema;

const priceSchema = new Schema({
  fueltype: { type: String, required: true },
  price: {type: Number, required: true}
}, {
  timestamps: true,
});

const Prices = mongoose.model('Prices', priceSchema);

module.exports = Prices;