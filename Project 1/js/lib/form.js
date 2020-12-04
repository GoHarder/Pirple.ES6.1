/**
 * Module to handle forms
 */

// Imports
import validate from '../lib/validate.js';

// Container for module
const lib = {};

// Get data from the form and put it into a payload object
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

// Export module
export default lib;
