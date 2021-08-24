const mongoose = require('mongoose');
mongoose.plugin(require('meanie-mongoose-to-json'));


const Schema = mongoose.Schema;

const pumperRecordSchema = new Schema({
    pumpername: { type: String, required: true },
    saleDate: { type: Date, required: true},
    payableAmount: { type: String, required: true},
    paiedAmount: { type:String, required: true },
    balance: { type:String, required:true},
    searchkey: { type:String, required:true, unique: true },
}, {
    timestamps: true,
});

const PumperRecord  = mongoose.model('PumperRecord', pumperRecordSchema);

module.exports = PumperRecord;