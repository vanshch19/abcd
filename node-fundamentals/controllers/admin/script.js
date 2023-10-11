const cloudinary = require('cloudinary').v2
const DatauriParser = require('datauri/parser');
const Products = require('../../models/Products');

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
}); 

module.exports.getAddProduct = (req,res,next)=>{
  res.render('addproduct',{
    isAdmin: req.user.isAdmin,
    cartCount: req.user.cart.length
  });
}

module.exports.postAddProduct = async (req,res,next)=>{
  // console.log(req.file);
  const {name,price,feature1,feature2,feature3,warranty,category,discount} = req.body;
  console.log(feature1,feature2,feature3)
  try{
      const parser = new DatauriParser();

      cloudinary.uploader.upload(parser.format('.png', req.file.buffer).content, async (error, result)=>{
        // console.log(result, error);
        try{
          await Products.create({
            name,
            price,
            feature1,
            feature2,   // yaha alag se screenres likha hai bcz peeche se name screenres hai aur yaha destructure karte time variable name same hona chaiye 
            feature3,
            imageUrl: result.url,
            warranty,
            userId: req.user._id,
            discount,
            category
          })
          return res.redirect('/shop/products');
        }
        catch(err){
          return next(err);
        }
      });
    }
    catch(err){
      return next(err);    // return is written taaki do bar response na jaye
    }
}


module.exports.getProducts = async (req,res,next)=>{
  try{
      let products = await Products.find({
        userId: req.user._id
      })
      res.render('admin/adminproducts',{
        products,
        isAdmin: req.user.isAdmin,
        user: req.user,
        cartCount: req.user.cart.length
      })
  }
  catch(err){
    next(err);
  }
}


