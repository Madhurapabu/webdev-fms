const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pumperSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
}, {
    timestamps: true,
});

const Pumper  = mongoose.model('Pumper', pumperSchema);

module.exports = Pumper;