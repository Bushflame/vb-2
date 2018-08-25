export const gallery = () => {
    const current = document.querySelector('#current');
    // the images are a list to be iterated over
    const imgs = document.querySelectorAll('.imgs img');
    // set opacity of thumbnails
    const opacity = 0.4;
    //set first img Opacity
    imgs[0].style.opacity = opacity;
    imgs.forEach(img => img.addEventListener('click',imgClick));
    
    function imgClick(e){
        //reset opacity
        imgs.forEach(img => (img.style.opacity = 1));
    
        //change image to clicked
        current.src = e.target.src
        // e.target.text.classList.add('show')
        //add fade in class
        current.classList.add('fade-in');
        // remove fadin class after .5s
        setTimeout(() => current.classList.remove('fade-in'), 500);
        // change opacity
        e.target.style.opacity = opacity
    }
    };