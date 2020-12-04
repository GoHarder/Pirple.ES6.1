/**
 * Sign up handlers
 */

// Imports
import comp from '../comp.js';
import form from '../form.js';
import validate from '../validate.js';
import helpers from '../helpers.js';
import data from '../data.js';
import user from '../user.js';
import dashboard from './dashboard.js';

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
   comp.ele.userInfoError.display = 'none';
   comp.ele.modalMenu.display = 'none';
   comp.ele.modalForm.display = 'block';
   comp.ele.signUp.display = 'none';
   comp.ele.logIn.display = 'block';
   comp.render();
};

lib.ok = event => {
   comp.ele.userInfoError.dom.innerHTML = '<p></p>';
   const payload = form.getData(event.target.form);
   const tests = {
      email: { test: 'email', error: 'Email is not valid.' },
      password: { test: 'password', error: 'Password is not valid.' }
   };
   const errors = validate.form(payload, tests);

   // Validate the form
   if (errors.length === 0) {
      // Check if the user exists
      let doc = data.findOne('users', [`email=${payload.email}`]);

      if (doc) {
         // Check Password
         if (doc.password === payload.password) {
            comp.ele.modal.display = 'none';
            comp.ele.spa.display = 'block';
            user.id = doc.id;
      
            dashboard.load();
         } else {
            comp.ele.userInfoError.dom.innerHTML = '<p>Error:</p>\n<p>Password is incorrect.</p>';
            comp.ele.userInfoError.display = 'block';
         }
      } else {
         comp.ele.userInfoError.dom.innerHTML = '<p>Error:</p>\n<p>A user with that email does not exist.</p>';
         comp.ele.userInfoError.display = 'block';
      }
   } else {
      comp.ele.userInfoError.dom.innerHTML = helpers.errorHTML(errors);
      comp.ele.userInfoError.display = 'block';
   }

   comp.render();
};

lib.cancel = () => {
   comp.ele.modalMenu.display = 'block';
   comp.ele.modalForm.display = 'none';
   comp.render();
};

// Export module
export default lib;
