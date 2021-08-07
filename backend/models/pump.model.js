const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pumpSchema = new Schema({
  username: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date, required: true },
}, {
  timestamps: true,
});

const Pumps = mongoose.model('Pumps', pumpSchema);

module.exports = Pumps;