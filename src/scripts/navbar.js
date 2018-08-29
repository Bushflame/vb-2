// toggle the nav using the burger
    export const navbar = () => {
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
        // change navbar when scrolling begins
        let navWrap = document.getElementById('navWrap');
        var sticky = navWrap.offsetTop;
        window.addEventListener ('scroll', function() {
                if(window.pageYOffset >= sticky) {
                navWrap.classList.add('sticky')
                navWrap.classList.remove('static')
                }else {
                    navWrap.classList.remove('sticky')
                    // navWrap.classList.add('static')
                }

        });




        // var links = document.getElementsByTagName("a"); // more specific selector if other links
        // for (var i = 0; i < links.length; i++) {
        //     var link = links[i];
        //     link.onclick = function () {
        //         var prev = document.getElementsByClassName("active");
        //         if (prev && prev[0]) {
        //             prev[0].className = ""; // if using other classes, filter better
        //         }
        //         this.className += " active";
        //     };
        // }

    }
//https://stackoverflow.com/questions/14389687/window-scroll-in-vanilla-javascript
//https://www.youtube.com/watch?v=bW8dIe2de_c
//https://codepen.io/jessicamarcus/pen/EvmRMg
