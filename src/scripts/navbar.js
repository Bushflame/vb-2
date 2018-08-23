// toggle the nav using the burger
    export const myFunction = () => {
        const menuIcon = document.getElementById('openMenu').addEventListener("click", function(){
            let nav = document.getElementById('nav');
            nav.classList.toggle('hide')
        });
        //close nav on clicking anywhere on the nav
        const closeNav = document.getElementById('navUl').addEventListener('click',
        function(){
            let nav = document.getElementById('nav')
            nav.classList.add('hide')
        });
        // // change navbar when scrolling occurs
        
        let navWrap = document.getElementById('navWrap');
        window.addEventListener ('scroll', function() {
                if(window.pageYOffset > 300) {
                navWrap.classList.add('small')
                }else {
                    navWrap.classList.remove('small')
                }
              
        });
    }
//https://stackoverflow.com/questions/14389687/window-scroll-in-vanilla-javascript
//https://www.youtube.com/watch?v=bW8dIe2de_c
//https://codepen.io/jessicamarcus/pen/EvmRMg