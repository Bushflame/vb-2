// require('./scripts/temp.js')
import {addText} from './scripts/temp.js';
require('./scripts/smooth.js')
require('./scripts/navbar.js')
require ('./index.css');
addText()



 function myFunction() {
    const menuIcon = document.querySelector('.menuIcon').addEventListener(click);

    showMenu = function(){
        var x = document.getElementById("nav");
        if (x.className === "mainNav") {
            x.className += "responsive";
        } else {
            x.className = "MainNav";
        }
    }
}
