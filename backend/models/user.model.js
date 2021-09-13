const mongoose = require('mongoose');
mongoose.plugin(require('meanie-mongoose-to-json'));

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    gender:{ type: String, required: true},
    dob: { type: Date, required: true},
    address: { type: String, required: true},
    nic: { type:String, required: true, unique: true },
    contactnumber: { type: Number, required: true},
    username: { type: String, required: true, unique: true},
    password: {type:String, required: true, minlength:6},
}, {
    timestamps: true,
});

const User  = mongoose.model('User', userSchema);

module.exports = User;