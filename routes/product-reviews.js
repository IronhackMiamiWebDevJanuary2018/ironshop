const express = require('express');
const Product = require('../models/product');

// NEW
const Review = require('../models/review');

const router = express.Router();

// Route to Handle New Review Form
router.get('/products/:productId/reviews/new', (req, res, next) => {
    let productId = req.params.productId;

    Product.findById(productId, (err, product) => {
        if (err) { next(err); }
        res.render('product-reviews/new', { product: product });
    });
});

// Route to Handle Review Form Submission
router.post('/products/:id/reviews', (req, res, next) => {
    // Load the Product From the Database
    let productId = req.params.id;

    Product.findById(productId, (err, product) => {
        // Create the Schema Object to Save the Review
        const newReview = new Review({
            content: req.body.content,
            stars: req.body.stars,
            author: req.body.author
        });
        
        // Add Review to Product Reviews Array
        product.reviews.push(newReview);
    
        // Save the product to the Database
        product.save((err) => {
            if (err) { return next(err); }
            // Redirect the user to the product page
            res.redirect(`/products/${product._id}`);
        });
    });
});

module.exports = router;