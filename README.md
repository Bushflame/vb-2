# parcel-stylus-bp
## Basic Parcel with Stylus boilerpate  
While Parcel works out of the box with POSTCSS, and with Stylus too to some extent, problems occurred when I tried adding Stylus extensions such as nib.

## Solution
The solution to date is to create a separate environment (folder system) for Stylus to work in, and let Parcel take over for the final build.

## Babel
Unless you're using a framework work, Babel works straight out of the box  
The index.js file imports the sepearate modules. In this case I have the modules in src/scripts

## About the stylus scripts & extensions
Scripts to run Parcel and Stylus c/w extensions are added to the package.json, along with a script to run all  
**stylus: compiles styl to css and adds vendor prefixes using nib**  
**parcels: is created to run the parcel live server**  
**start: runs the two above**  

## Construction
All the construction is done in the src folder. The index.styl imports all modules from the "styls" folder. From here Parcel takes over and creates/updates the dist folder

## Final build
Run: "parcel build src/index.html" minifies html, css and js. Currently having to remove the forward slash '/' from the links to external style and js sheets

## Usage
from the command line    
    npm install parcel-bundler -g  
    npm install stylus -g  
    clone this repo - git clone  https://github.com/Bushflame/parcel-stylus-bp.git  
    Change directory - cd parcel-stylus-bp  
    initialize -  npm init  
    install dependencies - npm install  
    start the server - npm run start  
The dist folder and files will now have been created and you should have a live server up and running on localhost:1234  
Rather than navigate in the browser, you can click on the live link in cli...  
server running at http://localhost:1234
