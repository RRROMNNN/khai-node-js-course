const express = require('express');
const products = require('./products');
const { blockSpecialBrand } = require('./middleware');

const router = express.Router();

// handle get request for path /products
router.get('/products', (request, response) => {
   return response.json(products);
});

// handle get request for path /products/:brand
router.get('/products/:brand', blockSpecialBrand, (request, response) => {
   const { brand } = request.params; // Access the brand parameter from the URL

   // Filter products based on the brand parameter
   const filteredProducts = products.filter(product => product.brand === brand);

   response.json(filteredProducts); // Send the filtered products as a JSON response
});

// handle get request for path /products/id/:id
router.get('/products/id/:id', (request, response) => {
   const { id } = request.params; // id тут спочатку буде рядком

   // Пошук продукту, де id збігається з числом
   const product = products.find(product => product.id === Number(id));

   if (product) {
      response.json(product); // Повернення знайденого продукту
   } else {
      response.status(404).json({ message: "Product not found" });
   }
});

router.get('/productswitherror', (request, response) => {
   let err = new Error("processing error ")
   err.statusCode = 400
   throw err
});


module.exports = router;