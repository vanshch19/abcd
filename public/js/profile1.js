if(document.querySelector('.scroll-container').scrollLeft === 0){
    var scrollLeftButton = document.getElementById('scrollLeftButtonElec');
    scrollLeftButton.style.visibility = 'hidden'; 
}


document.getElementById('scrollRightButtonElec').addEventListener('click', function() {
    var scrollLeftButton = document.getElementById('scrollLeftButtonElec');
    scrollLeftButton.style.visibility = 'visible';

    var container = document.querySelector('.scroll-container');
    container.scrollLeft += 1500; // Adjust the value as per your requirement

    var scrollLeft = Math.ceil(container.scrollLeft);
    var maxScroll = (container.scrollWidth - container.clientWidth);
    
    var scrollRightButton = document.getElementById('scrollRightButtonElec');
    // console.log(container.scrollLeft)

    if (scrollLeft === maxScroll) {
        console.log('h1')
        scrollRightButton.style.visibility = 'hidden';
    } 
    else {
        scrollRightButton.style.visibility = 'visible';
    }
});


document.getElementById('scrollLeftButtonElec').addEventListener('click', function() {
    var scrollRightButton = document.getElementById('scrollRightButtonElec');
    scrollRightButton.style.visibility = 'visible';
    
    var container = document.querySelector('.scroll-container');
    container.scrollLeft -= 1500; // Adjust the value as per your requirement

    var scrollLeft = container.scrollLeft;
    console.log(scrollLeft)

    var scrollLeftButton = document.querySelector('#scrollLeftButtonElec');

    if (scrollLeft === 0) {
        scrollLeftButton.style.visibility = 'hidden';
    } 
    else {
        scrollLeftButton.style.visibility = 'visible';
    }
});



const searchInp = document.querySelector('.searchinp');
const searchBtn = document.querySelector('.searchbtn');

searchBtn.addEventListener('click', async (ev)=>{
    const text = searchInp.value.toUpperCase();
    console.log(text)

    await axios.get('/userfunctionality/certainprod',{
        params:{
            type: 'text'
        }
    })
})