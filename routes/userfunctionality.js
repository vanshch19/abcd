const path = require('path');
const express = require('express');
const router = express.Router();
const userFunctionalityController = require('../controllers/userFunctionality/script');

router.get('/passwordchange',userFunctionalityController.getPasswordChange); // password change page will appear
router.post('/passwordchange', userFunctionalityController.postPasswordChange);
router.get('/addtocart', userFunctionalityController.getAddToCart);
router.get('/cartitems', userFunctionalityController.getCartItems);
router.get('/incrementqty', userFunctionalityController.getIncrementQty);
router.get('/decrementqty', userFunctionalityController.getDecrementQty);
router.get('/removeproduct', userFunctionalityController.getRemoveProduct);
router.get('/products', userFunctionalityController.getProducts);


// products pages
router.get('/certainprod', userFunctionalityController.getCertainProd);


module.exports=router;