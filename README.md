# parcel-stylus-bp
Basic Parcel with Stylus boilerpate
While Parcel works out of the box with POSTCSS, and with Stylus too to some extent, problems occurred when I tried adding Stylus extensions such as nib.
# Solution
The solution to date is to create a separate environment (folder system) for Stylus to work in, and let Parcel take over for the final build.
Parcel, Stylus and, wherever possible, Stylus extensions are installed globally
Scripts to run Parcel and Stylus c/w entensions are added to the package.json, along with a script to run all
# About the stylus scripts & extensions
One script adds vendor prefixes and outputs to  void.css: used to check prefixes are being added. This file is then redundant
The other script adds vendor prefixes and compresses ready for parcel to collect and add to the dist folder
# Building
All the building is done in the src folder. The index.styl imports all modules from the "styls" folder
