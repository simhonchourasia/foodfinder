const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    imgUrl: {type: String, required: true},
    swiped: {type: String, required: true}
}, {timestamps: true});

const Item = mongoose.model('Item', ItemSchema);
module.exports = Item;