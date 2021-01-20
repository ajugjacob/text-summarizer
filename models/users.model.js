const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, required: true, minlength: 4 },
    password: { type: String, required: true, minlength: 8 },
},{
    timestamp: true,
})

 const User = mongoose.model('User', userSchema);

 module.exports = User;