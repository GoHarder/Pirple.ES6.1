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
   comp.ele.signUp.display = 'block';
   comp.ele.logIn.display = 'none';
   comp.render();
};

lib.ok = event => {
   comp.ele.userInfoError.dom.innerHTML = '<p></p>';
   const payload = form.getData(event.target.form);
   const tests = {
      firstName: { test: 'string', error: 'First name not a valid string.' },
      lastName: { test: 'string', error: 'Last name not a valid string.' },
      email: { test: 'email', error: 'Email is not a valid email string.' },
      password: { test: 'password', error: 'Passwords must contain a number, special character, capitol letter and be 8 to 15 characters long.' },
      tos: { test: 'isTrue', error: 'Agree to the terms of service to continue.' }
   };
   const errors = validate.form(payload, tests);

   // Validate the form
   if (errors.length === 0) {
      // Check if the user exists
      let doc = data.findOne('users', [`email=${payload.email}`]);

      if (!doc) {
         // Create user object and store
         const string = `user-${helpers.createRandomString(20)}`;
         payload.id = string;
         doc = {};
         doc[string] = payload;
         data.insertOne('users', doc);

         // Update
         comp.ele.modal.display = 'none';
         comp.ele.spa.display = 'block';
         user.id = string;
      } else {
         comp.ele.userInfoError.dom.innerHTML = '<p>Error:</p>\n<p>A user with that email already exists.</p>';
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
