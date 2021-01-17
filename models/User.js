const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {type: String, required: true}, 
    
    liked: {type: Array, required: true, default: []},
    swipedOn: {type: Array, required: true, default: []},
    
    partner: {type: String, required: true}
}, {timestamps: true});

const User = mongoose.model('User', UserSchema);
module.exports = User;