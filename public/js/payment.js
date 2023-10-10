// $(document).ready(function(){
// 	$(product.id).submit(function(e){
// 		e.preventDefault();

// 		var formData = $(this).serialize();
//         alert("ok");



// 	});
// });


// $(document).ready(function(){

//     $('.productslist').click(function(ev){
//         // alert(ev.target)
//         console.log(ev.target)
//         ev.preventDefault();
//         // $(ev.target).parent()[0];
//         // console.log($(ev.target).parent())
//         console.log($('.bynow').id)

//         if(ev.target == $('.bynow')){
//         var formData = $(ev.target).parent('form').serialize();
//         console.log(formData)
//         }
//         // alert("ok");
       
// 		$.ajax({
// 			url:"/payment/createOrder",
// 			type:"POST",
// 			data: formData,
// 			success:function(res){
// 				if(res.success){
// 					var options = {
// 						"key": ""+res.key_id+"",
// 						"amount": ""+res.amount+"",
// 						"currency": "INR",
// 						"name": ""+res.product_name+"",
// 						"description": ""+res.description+"",
// 						"image": "https://dummyimage.com/600x400/000/fff",
// 						"order_id": ""+res.order_id+"",
// 						"handler": function (response){
// 							alert("Payment Succeeded");
// 							// window.open("/","_self")
// 						},
// 						"prefill": {
// 							"contact":""+res.contact+"",
// 							"name": ""+res.name+"",
// 							"email": ""+res.email+""
// 						},
// 						"notes" : {
// 							"description":""+res.description+""
// 						},
// 						"theme": {
// 							"color": "#2300a3"
// 						}
// 					};
// 					var razorpayObject = new Razorpay(options);
// 					razorpayObject.on('payment.failed', function (response){
// 							alert("Payment Failed");
// 					});
// 					razorpayObject.open();
// 				}
// 				else{
// 					alert(res.msg);
// 				}
// 			}
// 		})
//     })



const productslist = document.querySelector('.productslist');

async function makeOrder(amount) {
	// console.log(amount)
    try {
        const res = await axios({
            method: 'post',
            data:  {amount},
            url: `/payment/createorder`,
            headers: { 'X-Requested-With': 'XMLHttpRequest' }
        });
		// console.log(res)

        console.log(res.data.order.amount);

        const options = {
            "key": "rzp_test_phdpSpDG4XbB1b", // Enter the Key ID generated from the Dashboard
            "amount": res.data.order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Ecommerce Corp",
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": res.data.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": "http://localhost:4444/payment/payment-verify/",
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        var rzp1 = new Razorpay(options);
        rzp1.open();
    } 
    catch (e) {
        window.location.replace('/admin/products');
    }
}

productslist.addEventListener('click', (ev)=>{
	// console.log(typeof(parseInt(ev.target.getAttribute('price'))))
	const productId = ev.target.getAttribute('productId');

	// if(ev.target.classList.contains('bynow') && ev.target.id == productId) { 
	// 	console.log(true)
	// }

	if(ev.target.classList.contains('bynow') && ev.target.id == productId) {  // pehle bynow btn par click hona chahiye aur fir btnId check kare
		let amount = ev.target.getAttribute('price');
		console.log(amount);
		makeOrder(amount);
	}		
})
