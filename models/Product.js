const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        trim: true,
    },
    price: {
        type: Number,
    },
    description: {
        type: String,
        trim: true,
    },
    url_img: {
        type: String,
        trim: true
    },
    category: {
        type: String
    }
});

module.exports = mongoose.model('Product', productSchema);