const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name        : String,
    price       : Number,
    imageUrl    : String,
    description : String,
    reviews: [Review.schema]
});

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;