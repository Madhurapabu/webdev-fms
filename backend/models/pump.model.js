const mongoose = require('mongoose');
mongoose.plugin(require('meanie-mongoose-to-json'));

const Schema = mongoose.Schema;

const pumpSchema = new Schema({
  fueltype: { type: String, required: true },
  pumpname: { type: String, required: true, unique: true },
  initialreading: { type: Number, required: true },
  ongoingreading: {type: Number, required: false},
}, {
  timestamps: true,
});

const Pumps = mongoose.model('Pumps', pumpSchema);

module.exports = Pumps;