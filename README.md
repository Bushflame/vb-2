# parcel-stylus-bp
Basic Parcel with Stylus boilerpate
While Parcel works out of the box with POSTCSS, and with Stylus too to some extent, problems occurred when I tried adding Stylus extensions such as nib.
The solution to date is to create a separate environment (folder system) for Stylus to work in, and let Parcel take over for the final build.
Parcel, Stylus and, wherever possible, Stylus extensions are installed globally
Scripts to run Parcel and Stylus c/w entensions are added to the package.json, along with a script to run all

