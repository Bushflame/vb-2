# parcel-stylus-bp
Basic Parcel with Stylus boilerpate
While Parcel works out of the box with POSTCSS, and with Stylus too to some extent, problems occurred when I tried adding Stylus extensions such as nib.
# Solution
The solution to date is to create a separate environment (folder system) for Stylus to work in, and let Parcel take over for the final build.
Parcel, Stylus and, wherever possible, Stylus extensions are installed globally

# About the stylus scripts & extensions
Scripts to run Parcel and Stylus c/w extensions are added to the package.json, along with a script to run all
stylus: compiles styl to css and adds vendor prefixes using nib
parcels: is created to run the parcel live server
start: runs the two above
# Construction
All the construction is done in the src folder. The index.styl imports all modules from the "styls" folder. From here Parcel takes over and creates/updates the dist folder
# Final build
Run: "parcel build src/index.html" minifies html, css and js. Currently having to remove the forward slash '/' from the links to external style and js sheets
