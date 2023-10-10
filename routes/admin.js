const path = require('path');
const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin/script');
// /add-product
router.get('/addproduct',adminController.getAddProduct);
router.post('/addproduct',adminController.postAddProduct);
router.get('/products',adminController.getProducts);


module.exports=router;