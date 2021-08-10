const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pumpSchema = new Schema({
  fueltype: { type: String, required: true },
  pumpname: { type: String, required: true, unique: true },
  initialreading: { type: Number, required: true },
}, {
  timestamps: true,
});

const Pumps = mongoose.model('Pumps', pumpSchema);

module.exports = Pumps;