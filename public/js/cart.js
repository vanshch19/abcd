const plusbtn = document.querySelector('.plusbtn');
const minusbtn = document.querySelector('.minusbtn');
const cartproductsdiv = document.querySelector('.cartproductsdiv');


cartproductsdiv.addEventListener('click', async (ev)=>{
    // console.log(ev.target);
    let productId = ev.target.getAttribute('productId');
    const totalPrice = document.querySelector('.mrp');
    const totalDiscount = document.querySelector('.discount');
    const totalAmount = document.querySelector('.totalamountnum');
    const totalSaved = document.querySelector('.save');
    
    let btnId = ev.target.getAttribute('productId');
    if(btnId == productId){
            

        //Minus Button working
        if(ev.target.classList.contains('minusbtn')){
            let qtyinp = ev.target.parentElement.nextElementSibling;
            try {
                if(qtyinp.value > 1){
                    let data = await axios.get(`/userfunctionality/decrementqty?productId=${productId}`);
                    console.log(data);
                    qtyinp.value = data.data.qty;
                    totalPrice.innerText = -data.data.totalPrice;
                    totalDiscount.innerText = data.data.totalDiscount;
                    totalAmount.innerText = data.data.totalAmount;
                    totalSaved.innerText = data.data.totalDiscount;
                }
                else{
                    ev.target.classList.add('disabled');
                }
            }
        
            catch(err){
                console.log("error");
            }
        }


        
        //plus Button working
        else{
            let qtyinp = ev.target.parentElement.previousElementSibling;
                    // console.log(qtyinp)
            try{
                if(ev.target.classList.contains('plusbtn')){   
                    if (qtyinp.value < 10){
                        let data = await axios.get(`/userfunctionality/incrementqty?productId=${productId}`);                            
                            qtyinp.value = data.data.qty;
                            totalPrice.innerText = -data.data.totalPrice;
                            totalDiscount.innerText = data.data.totalDiscount;
                            totalAmount.innerText = data.data.totalAmount;
                            totalSaved.innerText = data.data.totalDiscount;
                        }
                    else{
                        ev.target.classList.add('disabled');
                    }
                    }
                }
                catch(err){
                    console.log(err);
                } 
            }
    }        
})