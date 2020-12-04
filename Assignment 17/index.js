// Imports
import form from './app/form.js';
import handlers from './app/handlers.js';

// Container for the application
const index = {};

// Init (bootstrapping)
index.init = () => {
   form.bindButtons();
   handlers.init();
};

// Call the init processes after the window loads
window.onload = () => {
   index.init();
};
