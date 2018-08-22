
    export const myFunction = () => {
        const menuIcon = document.getElementById('openMenu').addEventListener("click", function(){
             let show = document.getElementById('caption')
             if(show.className === 'show'){
                 show.className += 'hide';
             }else {
                 show.className = 'show'
             }

        });

//https://www.sitepoint.com/community/t/a-simple-vanilla-js-menu-toggle/285165/13



        // showMenu = function(){
        //     document.getElementById('caption').innerText= 'fucking hell it works'
        // }
    }
 

//     showMenu = function(){
//         var x = document.getElementById("nav");
//         if (x.className === "mainNav") {
//             x.className += "responsive";
//         } else {
//             x.className = "MainNav";
//         }
//     }
// }




// function myFunction() {
//     var x = document.getElementById("myTopnav");
//     if (x.className === "topnav") {
//         x.className += " responsive";
//     } else {
//         x.className = "topnav";
//     }
// }
