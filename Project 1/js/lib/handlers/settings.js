/**
 * Settings handlers
 */

// Imports
import comp from '../comp.js';
import form from '../form.js';
import validate from '../validate.js';
import helpers from '../helpers.js';
import data from '../data.js';
import user from '../user.js';

// Container for module
const lib = {};

// Sent to handler
lib.route = (path, event) => {
   const routes = {
      '': lib.index,
      ok: lib.ok,
      cancel: lib.cancel
   };

   routes[path](event);
};

// Routes
lib.index = () => {
   comp.ele.settings.display = 'block';
   comp.ele.main.display = 'none';
   comp.render();
};

lib.ok = () => {
   console.log('settings.ok()');
};

lib.cancel = () => {
   comp.ele.settings.display = 'none';
   comp.ele.main.display = 'block';
   comp.render();
};

// Export module
export default lib;
