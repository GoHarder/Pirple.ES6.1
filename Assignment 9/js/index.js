// Imports
import data from './lib/data.js';
import comp from './lib/comp.js';
import dom from './lib/dom.js';

// Container for the application
var app = {};

// Init (bootstrapping)
app.init = function() {
   dom.init();
   comp.init();
   data.init();
};

// Call the init processes after the window loads
window.onload = () => {
   app.init();
};
