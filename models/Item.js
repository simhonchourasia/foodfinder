const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    restaurant_name: {type: String, required: true},
    rating: {type: String, required: true},
    address: {type: String, required: true},
    price: {type: String, required: true},
    image_url: {type: String, required: true},
    restaurant_url: {type: String, required: true},
    restaurant_phone_number: {type: String, required: true},
    swiped: {type: String, default: 'not yet'}
}, {timestamps: true});

const Item = mongoose.model('Item', ItemSchema);
module.exports = Item;