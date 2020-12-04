// Imports
import handlers from './handlers.js';
import validate from './validate.js';

// Container for module
const lib = {};

// Bind all buttons
lib.bindButtons = () => {
   const buttons = document.querySelectorAll('button');
   buttons.forEach(button => lib.bindButton(button));
};

// Bind a button
lib.bindButton = button => {
   const path = button.dataset.path;

   button.addEventListener('click', event => {
      event.preventDefault();
      handlers.route(path, event);
   });
};

// Get data from a form
lib.getData = form => {
   const elements = form.elements;
   let payload = {};

   for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      if (element.type !== 'submit') {
         const eleClass = validate.string(element.classList.value) ? element.classList.value.trim() : '';
         const eleValue = element.type == 'checkbox' && eleClass.indexOf('multiSelect') == -1 ? element.checked : element.value;
         const eleName = element.name;
         payload[eleName] = eleValue;
      }
   }
   return payload;
};

// Clear form
lib.clear = form => {
   const elements = form.elements;

   for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      if (element.type !== 'submit') {
         element.value = '';
      }
   }
};

// Export module
export default lib;
