const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pumperSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    gender:{ type: String, required: true},
    dob: { type: Date, required: true},
    address: { type: String, required: true},
    nic: { type:String, required: true },
    contactnumber: { type: Number, required: true},
    username: { type: String, required: true, unique: true},
}, {
    timestamps: true,
});

const Pumper  = mongoose.model('Pumper', pumperSchema);

module.exports = Pumper;