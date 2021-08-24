const mongoose = require('mongoose');
mongoose.plugin(require('meanie-mongoose-to-json'));

const Schema = mongoose.Schema;

const saleSchema = new Schema({
    pumpname: { type: String, required: true },
    fueltype: { type: String, required: true },
    ongoingreading:{ type: Number, required: true},
    sales_liters: { type: Number, required: true},
    sales: { type:Number, required: true },
    assign_pumpman: { type: String, required: true}, 
    payablevalue : {type: String, required: true},
    dateOfSales: { type: Date, required: true},
}, {
    timestamps: true,
});

const Sale  = mongoose.model('Sale', saleSchema);

module.exports = Sale;