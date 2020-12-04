/**
 * Dashboard handlers
 */

// Imports
import comp from '../comp.js';
import form from '../form.js';
import validate from '../validate.js';
import helpers from '../helpers.js';
import data from '../data.js';
import user from '../user.js';
import list from './list.js';

// Container for module
const lib = {};

// Sent to handler
lib.route = (path, event) => {
   const routes = {
      open: lib.open,
      delete: lib.delete,
      add: lib.add
   };

   routes[path](event);
};

// Routes
lib.open = event => {
   const id = event.target.parentNode.id;
   const doc = data.findOne('lists', [`id=${id}`]);

   if (doc) {
      list.load(id);
   } else {
      comp.ele.addListError.dom.innerHTML = '<p>Error:</p>\n<p>Can not open list.</p>';
      comp.ele.addListError.display = 'block';
   }
};

lib.delete = event => {
   comp.ele.addListError.dom.innerHTML = '<p></p>';
   const element = event.target.parentNode;
   const op = data.findOneAndDelete('lists', [`id=${element.id}`]);

   if (op) {
      lib.load();
   } else {
      comp.ele.addListError.dom.innerHTML = '<p>Error:</p>\n<p>Can not delete list.</p>';
      comp.ele.addListError.display = 'block';
   }

   comp.render();
};

lib.add = event => {
   comp.ele.addListError.dom.innerHTML = '<p></p>';
   const payload = form.getData(event.target.form);
   const tests = {
      title: { test: 'string', error: 'List title not a valid string.' }
   };
   const errors = validate.form(payload, tests);

   // Validate the form
   if (errors.length === 0) {
      // Check for duplicate list
      let doc = data.findOne('lists', [`title=${payload.title}`, `user=${user.id}`]);

      if (!doc) {
         // Create list object and store
         const string = `list-${helpers.createRandomString(20)}`;      
         payload.id = string;
         payload.date = Date.now();
         payload.user = user.id
         let doc = {};
         doc[string] = payload;
         data.insertOne('lists', doc);

         // Reload Dashboard
         lib.load();
         list.load(string);
      } else {
         comp.ele.addListError.dom.innerHTML = '<p>Error:</p>\n<p>List already exists.</p>';
         comp.ele.addListError.display = 'block';
      }
   } else {
      comp.ele.addListError.dom.innerHTML = helpers.errorHTML(errors);
      comp.ele.addListError.display = 'block';
   }

   comp.render();
};

// Functions
lib.load = () => {
   let docs = data.find('lists', [`user=${user.id}`]);
   const list = document.getElementById('dashboardList');
   const oldLis = document.querySelectorAll('.dashboardItem');

   if (oldLis.length !== 0) {
      oldLis.forEach(oldLi => {
         oldLi.remove();
      });
   }

   docs = docs.sort((doc1, doc2) => {
      return doc1.date - doc2.date;
   });

   docs.forEach(doc => {
      const li = document.createElement('li');
      li.id = doc.id;
      li.classList.add('dashboardItem');
      li.innerHTML = `
         <span>${doc.title}</span>
         <button data-app="dashboard/open" class="listButton">Open</button>
         <button data-app="dashboard/delete" class="listButton">Delete</button>
     `;

      list.appendChild(li);
   });

   const buttons = list.querySelectorAll('.listButton');

   buttons.forEach(button => {
      comp.bindButton(button);
   });
};

// Export module
export default lib;
