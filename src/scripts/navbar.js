function myFunction() {
    const menuIcon = document.querySelector('.menuIcon').addEventListener(click,showMenu);

    showMenu = function(){
        var x = document.getElementById("nav");
        if (x.className === "mainNav") {
            x.className += "responsive";
        } else {
            x.className = "MainNav";
        }
    }
}




// function myFunction() {
//     var x = document.getElementById("myTopnav");
//     if (x.className === "topnav") {
//         x.className += " responsive";
//     } else {
//         x.className = "topnav";
//     }
// }
