// let btn = document.querySelector('.addtocart');
// let productsList = document.querySelector('.productslist');
// // const axios = require('axios');

// productsList.addEventListener('click', async (ev)=>{
//     // console.log(ev.target)
//     // console.log(ev.target.classList.contains('addtocart'));
//     if(ev.target.classList.contains('addtocart')){
//         let productId = ev.target.getAttribute('productid');
//         console.log(productId);
//         try{
//             await function addToCartItem(){
//                 return axios.get(`/userfunctionality/addtocartitem?productId=${productId}`);
//             };
//             let addToCartItem()
//             let data = await axios.get(`/userfunctionality/addtocart?productId=${productId}`);
//             console.log(data);
//             let cartCount = document.querySelector('.cartitemnumdiv');
//             cartCount.innerText = data.data.cartCount;
//             console.log(cartCount);
//         }
//         catch(err){
//             console.log(err);
//         }
//     }  
// })
