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

The first part of the project has been augmented with a grunt pipeline.
To prepare the ```dist``` files via that, do as follows. Note that will
delete and overwrite the contents of the ```dist```-directory.

Call [grunt](http://gruntjs.com/getting-started) (assumes ```grunt-cli``` is already installed):
  1. Change to the project's root directory
  2. Run ```npm install```
  3. Run Grunt with ```grunt```
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

####Part 2: Optimize Frames per Second in pizza.html

Load views/pizza.html in a browser and play with it using Chrome developer
tools. The following fixes to improve performance have been applied:
* No repeated forced layout synchronizations anymore in ```changePizzaSizes```,
  also use relative sizing and get rid of ```determineDx```
* Move DOM-queries outside of loops where possible
* Move request to ```document.scrollTop``` outside of loop in ```updatePositions()```
  to avoid repeated forced layout synchronizations
* Calculate the number of moving pizzas dynamically based on viewport size


### Background information on optimization
* [Optimizing Performance](https://developers.google.com/web/fundamentals/performance/ "web performance")
* [Analyzing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/analyzing-crp.html "analyzing crp")
* [Optimizing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/optimizing-critical-rendering-path.html "optimize the crp!")
* [Avoiding Rendering Blocking CSS](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-blocking-css.html "render blocking css")
* [Optimizing JavaScript](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript.html "javascript")
* [Measuring with Navigation Timing](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/measure-crp.html "nav timing api"). We didn't cover the Navigation Timing API in the first two lessons but it's an incredibly useful tool for automated page profiling. I highly recommend reading.
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/eliminate-downloads.html">The fewer the downloads, the better</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html">Reduce the size of text</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization.html">Optimize images</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching.html">HTTP caching</a>
