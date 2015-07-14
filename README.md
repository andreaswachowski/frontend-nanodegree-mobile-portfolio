## Website Performance Optimization portfolio project

Optimized portfolio page for Udacity front-end web developer nanodegree.

### Background
* [Udacity Course "Website Performance Optimization"](https://www.udacity.com/course/ud884).
* [Udacity Course "Browser Rendering Optimization"](https://www.udacity.com/course/ud884).

### Install

Clone the git repository to a local directory. That's it!
The project required to submit both source and production code, so just
navigate to ```dist/index.html``` to see the result for the
index-optimization, and to ``views/pizza.html``` for the FPS-assignment.

To install via the grunt pipeline (which will delete and overwrite the
contents in dist), do as follows:

Call [grunt](http://gruntjs.com/getting-started) (assumes grunt-cli is already installed):
1. Change to the project's root directory
2. Run ```npm install```
3. Run Grunt with ```grunt```
   Grunt will concatenate, minify, fingerprint the assets (HTML, CSS, JS)
   as required. Afterwards, the processed files can be found in the
   ```dist``` directory (below the project's root directory).

   Open ```dist/index.html``` in a local browser to see the result.

In order to perform the PageSpeed tests automatically with grunt and
ngrok, make sure the ``dist```-location is accessible from a local web
server (or make the location accessible).

####Part 1: Test PageSpeed Insights score for index.html

1. Adapt the 'paths'-variables in the pagespeed task in the Gruntfile to
   match your environment.
2. Run ```grunt test``` for PageSpeed analysis

To run a local server, do

  ```bash
  $> cd /path/to/your-project-folder
  $> python -m SimpleHTTPServer 8080
  ```

Alternatively, for example, [configure Apache for Mac OS
X](http://osxdaily.com/2012/09/02/start-apache-web-server-mac-os-x/). In
that case, the project is preferrably located under ```~/Sites```.

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

### Customization with Bootstrap
The portfolio was built on Twitter's <a href="http://getbootstrap.com/">Bootstrap</a> framework. All custom styles are in `dist/css/portfolio.css` in the portfolio repo.

* <a href="http://getbootstrap.com/css/">Bootstrap's CSS Classes</a>
* <a href="http://getbootstrap.com/components/">Bootstrap's Components</a>

### Sample Portfolios

Feeling uninspired by the portfolio? Here's a list of cool portfolios I found after a few minutes of Googling.

* <a href="http://www.reddit.com/r/webdev/comments/280qkr/would_anybody_like_to_post_their_portfolio_site/">A great discussion about portfolios on reddit</a>
* <a href="http://ianlunn.co.uk/">http://ianlunn.co.uk/</a>
* <a href="http://www.adhamdannaway.com/portfolio">http://www.adhamdannaway.com/portfolio</a>
* <a href="http://www.timboelaars.nl/">http://www.timboelaars.nl/</a>
* <a href="http://futoryan.prosite.com/">http://futoryan.prosite.com/</a>
* <a href="http://playonpixels.prosite.com/21591/projects">http://playonpixels.prosite.com/21591/projects</a>
* <a href="http://colintrenter.prosite.com/">http://colintrenter.prosite.com/</a>
* <a href="http://calebmorris.prosite.com/">http://calebmorris.prosite.com/</a>
* <a href="http://www.cullywright.com/">http://www.cullywright.com/</a>
* <a href="http://yourjustlucky.com/">http://yourjustlucky.com/</a>
* <a href="http://nicoledominguez.com/portfolio/">http://nicoledominguez.com/portfolio/</a>
* <a href="http://www.roxannecook.com/">http://www.roxannecook.com/</a>
* <a href="http://www.84colors.com/portfolio.html">http://www.84colors.com/portfolio.html</a>
