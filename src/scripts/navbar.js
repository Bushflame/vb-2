
    export const myFunction = () => {
        const menuIcon = document.getElementById('openMenu').addEventListener("click", function(){
            let nav = document.getElementById('nav');
            nav.classList.toggle('hide')
        });
        //close nav on click
        const closeNav = document.getElementById('navUl').addEventListener('click',
        function(){
            let nav = document.getElementById('nav')
            nav.classList.add('hide')
        });
        // change navbar when scrolling occurs
        window.addEventListener ('scroll', function() {
                let navWrap = document.getElementById('navWrap');
                navWrap.classList.remove('temporary')
        });
    }
//https://stackoverflow.com/questions/14389687/window-scroll-in-vanilla-javascript
//https://www.youtube.com/watch?v=bW8dIe2de_c
