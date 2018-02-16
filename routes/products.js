const express = require('express');
const Product = require('../models/product');

const router = express.Router();

router.get('/', (req, res, next) => {
    Product.find({}, (err, products) => {
        if (err) {return next(err) }

        res.render('products/index', {
            products: products
        });
    });
});

// Route Handler for New Product Form - GET
router.get('/new', (req, res, next) => {
    res.render('products/new');
});

// Route Handler for Create Product - POST
router.post('/', (req, res, next) => {
    // Take the params and translate them into a new object
    const productInfo = {
        name: req.body.name,
        price: req.body.price,
        imageUrl: req.body.imageUrl,
        description: req.body.description
    }

    // Create a new Product with the Params passed
    // in from the "/products/new" form
    const newProduct = new Product(productInfo);

    newProduct.save( (err) => {
        // Error Handling
        if (err) { return next(err) }

        // Redirect to the List of Products (/products)
        // if it saves.
        return res.redirect('/products');
    });
}); 

// Show Individual Product Details
// "/products/:id"
router.get('/:id', (req, res, next) => {
    const productId = req.params.id;

    Product.findById(productId, (err, product) => {
        if (err) { return next(err); }
        res.render('products/show', { product: product });
    });
});

module.exports = router;

