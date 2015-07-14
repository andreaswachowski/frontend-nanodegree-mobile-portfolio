## Website Performance Optimization portfolio project

Optimized portfolio page for Udacity front-end web developer nanodegree.

### Background
* [Udacity Course "Website Performance Optimization"](https://www.udacity.com/course/ud884).
* [Udacity Course "Browser Rendering Optimization"](https://www.udacity.com/course/ud884).

### Install

Clone the git repository to a local directory. That's it!
The project required to submit both source and production code, so just
navigate to ```dist/index.html``` to see the result for the
index-optimization, and to ```views/pizza.html``` for the FPS-assignment.

The first part of the project (index.html optimization) has been automated
with a grunt pipeline (taking lots of ideas from yeoman's Bootstrap/webapp template).
To prepare the ```dist``` files via grunt, do as follows. Note that doing so will
delete and overwrite (ie re-create) the contents of the ```dist```-directory.

Call [grunt](http://gruntjs.com/getting-started) (assumes ```grunt-cli``` is already installed):
  1. Change to the project's root directory
  2. Run ```npm install```
  3. Install GraphicsMagick or ImageMagick so that
     [grunt-responsive-images](https://github.com/andismith/grunt-responsive-images)
     can scale down the pizzeria image.
  4. Run Grunt with ```grunt```
     Grunt will concatenate, minify, fingerprint the assets (HTML, CSS, JS)
     as required. Afterwards, the processed files can be found in the
     ```dist``` directory (below the project's root directory).

     Open ```dist/index.html``` in a local browser to see the result.

####Part 1: Test PageSpeed Insights score for index.html

  1. Start a local server with

     ```bash
     $> cd /path/to/your-project-folder/dist
     $> python -m SimpleHTTPServer 8080
     ```
  2. Execute ```grunt test```

This simple server is not using gzip compression nor is it configured for caching. That would naturally be part of a proper server configuration, e.g. when using Apache. To complete the pipeline, one should consider using ```grunt-ssh-deploy``` or similar (Capistrano etc.).

####Part 2: Optimize Frames per Second in pizza.html

Load ```views/pizza.html``` in a browser and play with it using Chrome developer
tools. The following fixes to improve performance have been applied:
* No repeated forced layout synchronizations anymore in ```changePizzaSizes```,
  also use relative sizing and get rid of ```determineDx```
* Move DOM-queries outside of loops where possible
* Move request to ```document.scrollTop``` outside of loop in ```updatePositions()```
  to avoid repeated forced layout synchronizations
* Calculate the necessary number of moving pizzas dynamically based on viewport size (instead of hardcoding 200)
