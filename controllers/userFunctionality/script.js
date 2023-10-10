const Users = require('../../models/Users');
const Products = require('../../models/Products');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.getPasswordChange = (req,res,next)=>{
    // const id = req.query;
    // console.log(id);
    res.render('passwordchange',{
        user: req.user
    });
}


module.exports.postPasswordChange = (req,res,next)=>{
    const {currentpassword,newpassword} = req.body;
    const Dbcurrentpass = req.user.password;
    // console.log(Dbcurrentpass);
    if(currentpassword == currentpassword){
        const id = req.user._id;
        bcrypt.genSalt(saltRounds, async function(err, salt) {
            bcrypt.hash(newpassword, salt, async function(err, hash) {
                Users.findByIdAndUpdate(id,{password: hash})
                    .then(()=>{
                        req.flash('msg','password changed Successfully');
                        return res.redirect('/shop/profile');
                    })
            });
        });     
    }
}


// Adding productscounting to CartCount

module.exports.getAddToCart = async (req,res,next)=>{
    try{
        const {productId} = req.query;
        // console.log(productId);
        let indx = -1;
        req.user.cart.forEach((p,i) => {      // p = current element
            if(p.id == productId) indx = i;   // i = current element's index                                
        })
        // console.log(indx);
        if(indx == -1){
            req.user.cart.unshift({
                id: productId,
                quantity: 1
            })
        }
        else{
            req.user.cart[indx].quantity+= 1;
        }
        await req.user.save();
        // res.send({
        //     msg: 'Item added success',
        //     cartCount: req.user.cart.length
        // })

        res.redirect('/userfunctionality/cartitems');
        
    }
    catch(err){
        next(err);
    }
}


// Adding products to cart
module.exports.getCartItems = async (req,res,next)=>{
    try{
        


        const cartdetails=await req.user.populate('cart.id');  // isse user k sath cart ki thodi si(id,quantity) detail milegi 
        // console.log((cartdetails.cart)[1].id.price);                              // fir sirf cart ki poori detail k liye .cart karna pada 
        // console.log(req.user);
        // console.log(req.user.cart)
        
        let totalAmount = 0;
        let totalDiscount = 0;
        let totalPrice = 0;
        cartdetails.cart.forEach(item =>{
            totalPrice += item.quantity * item.id.price; 
            totalDiscount += item.quantity * item.id.discount;
            totalAmount = totalPrice - totalDiscount; 
            // console.log(totalAmount,totalDiscount,totalPrice)
        })


            res.render('cart', {
                user: req.user,
                cartdetails: cartdetails.cart,
                cartproducts: req.user.cart,
                cartCount: req.user.cart.length,
                totalAmount,
                totalDiscount,
                totalPrice
            })
    }
    catch(err){
        next(err);
    }    
}

module.exports.getDecrementQty = async (req,res,next)=>{
    try{
        const {productId} = req.query;
        console.log(productId)
        req.user.cart.forEach((p)=>{
            if(p.id == productId){ 
               p.quantity--;
            }
        })
        let qty;
        req.user.cart.filter((p)=>{
            if(p.id==productId){
                qty = p.quantity;
            }
        })
        await req.user.save();

        const cartdetails=await req.user.populate('cart.id'); 

        let totalAmount = 0;
        let totalDiscount = 0;
        let totalPrice = 0;
        cartdetails.cart.forEach(item =>{
            totalPrice += item.quantity * item.id.price; 
            totalDiscount += item.quantity * item.id.discount;
            totalAmount = totalPrice - totalDiscount;
        })

        res.send({
            msg:"Quantity Decremented",
            qty:qty,
            totalAmount,
            totalDiscount,
            totalPrice
        })
    }
    catch(err){
        next(err);
    }
}



module.exports.getIncrementQty = async (req,res,next)=>{
    try{
        const {productId} = req.query;

        req.user.cart.forEach((p)=>{
            if(p.id == productId){ 
               p.quantity++;
            }
        })
        let qty;
        req.user.cart.filter((p)=>{
            if(p.id==productId){
                qty = p.quantity;
            }
        })
        // console.log(qty);
        await req.user.save();

        const cartdetails=await req.user.populate('cart.id'); 
        
        let totalAmount = 0;
        let totalDiscount = 0;
        let totalPrice = 0;
        cartdetails.cart.forEach(item =>{
            totalPrice += item.quantity * item.id.price; 
            totalDiscount += item.quantity * item.id.discount;
            totalAmount = totalPrice - totalDiscount;
        })

        res.send({
            msg:"Quantity Incremented",
            qty:qty,
            totalAmount,
            totalDiscount,
            totalPrice
        })
    }
    catch(err){
        next(err);
    }
}


module.exports.getRemoveProduct = async (req,res,next)=>{
    try{
        const {productId} = req.query;
        // console.log(productId);
        // console.log(req.user.cart)
        await req.user.cart.forEach(p=>{
            if(p.id == productId){
                // console.log(p);
                req.user.cart.remove(p);
            }
        })
        await req.user.save();
        const cartdetails=await req.user.populate('cart.id');
        res.redirect('/userfunctionality/cartitems');
        // console.log(product);
    }
    catch(err){
        next(err);
    }
}



module.exports.getProducts = async (req,res,next)=>{
    try{
        let products = await Products.find({});
        res.send({
                products,
                msg: 'Products sent',
                cartCount: req.user.cart.length
            });
    }
    catch(err){
        next(err);
    }        
}




//------- Products Pages are Loaded----------//
module.exports.getCertainProd = async (req,res,next)=>{
    const type = req.query.type; 
    console.log(type)
    try{
        if(type == 'monitor'){
            let products = await Products.find({category: type});
            // console.log(products);
            res.render('certainprod/products',{
                products,
                prodheading: products[0].category.toUpperCase(),
                cartCount: req.user.cart.length
            })
        }

        if(type == 'trimmer'){
            let products = await Products.find({category: type});
            // console.log(products);
            res.render('certainprod/products',{
                products,
                prodheading: products[0].category.toUpperCase(),
                cartCount: req.user.cart.length
            })
        }

        if(type == 'powerbank'){
            let products = await Products.find({category: type});
            // console.log(products);
            res.render('certainprod/products',{
                products,
                prodheading: products[0].category.toUpperCase(),
                cartCount: req.user.cart.length
            })
        }
    }
    catch(err){
        next(err);
    }
}


