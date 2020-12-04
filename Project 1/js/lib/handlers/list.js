/**
 * List handlers
 */

// Imports
import comp from '../comp.js';
import form from '../form.js';
import validate from '../validate.js';
import helpers from '../helpers.js';
import data from '../data.js';
import user from '../user.js'
import dashboard from './dashboard.js'

// Container for module
const lib = {};

// Sent to handler
lib.route = (path, event) => {
   const routes = {
      save: lib.save,
      add: lib.add,
      delete: lib.delete,
      checked: lib.checked
   };

   routes[path](event);
};

// Routes
lib.save = () => {
   const listTitle = document.getElementById('listTitle');
   comp.ele.listItemError.dom.innerHTML = '<p></p>';
   comp.ele.listItemError.display = 'none';
 
   if (listTitle.value) {
      let doc = data.findOne('lists', [`user=${user.id}`, `title=${listTitle.value}`])

      if (!doc) {
         const itemList = document.getElementById('itemList');
         const listId = itemList.dataset.list;
         doc = data.findOne('lists', [`id=${listId}`]);
         doc.title = listTitle.value;
         data.update();
         dashboard.load()
      } else {
         comp.ele.listItemError.dom.innerHTML = '<p>Error:</p>\n<p>List title already exists.</p>';
         comp.ele.listItemError.display = 'block';
      }
   } else {
      comp.ele.listItemError.dom.innerHTML = '<p>Error:</p>\n<p>Add text to list.</p>';
      comp.ele.listItemError.display = 'block';
   }

   comp.render();
};

lib.add = event => {
   const itemList = document.getElementById('itemList');
   const listId = itemList.dataset.list
   comp.ele.listItemError.dom.innerHTML = '<p></p>';
   comp.ele.listItemError.display = 'none';

   // Check for open list
   if (listId) {
      const payload = form.getData(event.target.form);
      const tests = {
         text: { test: 'string', error: 'Item not a valid string.' }
      };
      const errors = validate.form(payload, tests);

      // Validate the form
      if (errors.length === 0) {
         // Add item to list
         const string = `listItem-${helpers.createRandomString(20)}`;
         payload.id = string;
         payload.checked = false;
         payload.list = listId
         const doc = {};
         doc[string] = payload;
         data.insertOne('listItems', doc);
         lib.load(listId);
      } else {
         comp.ele.listItemError.dom.innerHTML = helpers.errorHTML(errors);
         comp.ele.listItemError.display = 'block';
      }
   } else {
      comp.ele.listItemError.dom.innerHTML = '<p>Error:</p>\n<p>No list opened.</p>';
      comp.ele.listItemError.display = 'block';
   }

   comp.render();
};

lib.delete = (event) => {
   const id = event.target.parentNode.id;
   data.findOneAndDelete('listItems', [`id=${id}`])
   lib.load();
};

lib.checked = () => {
   const id = event.target.parentNode.id;
   const listItem = data.findOne('listItems', [`id=${id}`]);
   listItem.checked = !listItem.checked;
   data.update();
};

// Functions
lib.load = (id) => {
   const list = document.getElementById('itemList');
   id = id ? id : list.dataset.list;   
   const listDoc = data.findOne('lists', [`id=${id}`])
   const listItems = data.find('listItems', [`list=${id}`]) ? data.find('listItems', [`list=${id}`]) : [];  
   const titleInput = document.getElementById('listTitle');
   const oldLis = document.querySelectorAll('.listItem');

   list.dataset['list'] = listDoc.id

   titleInput.value = listDoc.title;

   if (oldLis.length !== 0) {
      oldLis.forEach(oldLi => {
         oldLi.remove();
      });
   }

   listItems.forEach(item => {
      const li = document.createElement('li');
      li.classList.add('listItem');
      li.innerHTML = `
         <form id="${item.id}" class="listItem">
            <input type="checkbox" name="checked" data-app="list/checked" class="listItemCheckbox" ${item.checked ? 'checked' : ''} />
            <span>${item.text}</span>
            <button data-app="list/delete" class="listItemButton">Delete</button>
         </form>
        `;

      list.appendChild(li);
   });

   const buttons = list.querySelectorAll('.listItemButton');
   const checkbox = list.querySelectorAll('.listItemCheckbox');

   buttons.forEach(button => {
      comp.bindButton(button);
   });

   checkbox.forEach(check => {
      comp.bindCheckbox(check);
   });
};

// Export module
export default lib;
