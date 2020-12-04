/**
 * Module for components
 */

// Imports
import handlers from './handlers/index.js';

// Container for module
const lib = {};

// Registered components
lib.ele = {
   modal: { display: 'block', dom: null },
   modalMenu: { display: 'block', dom: null },
   signUp: { display: 'block', dom: null },
   logIn: { display: 'block', dom: null },
   modalForm: { display: 'none', dom: null },
   userInfoError: { display: 'none', dom: null },
   settingsError: { display: 'none', dom: null },
   listItemError: { display: 'none', dom: null },
   addListError: { display: 'none', dom: null },
   spa: { display: 'none', dom: null },
   settings: { display: 'none', dom: null },
   main: { display: 'block', dom: null }
};

// Render the components
lib.render = () => {
   for (const key in lib.ele) {
      if (lib.ele.hasOwnProperty(key)) {
         const dom = lib.ele[key].dom;
         const display = lib.ele[key].display;
         dom.style.display = display;
      }
   }
};

// Bind all buttons and run the function in the data attribute.
lib.bindButtons = () => {
   const buttons = document.querySelectorAll('button');

   buttons.forEach(button => lib.bindButton(button));
};

// Bind a button that was made
lib.bindButton = button => {
   const path = button.dataset.app;
   const mainPath = path.split('/')[0];
   const subPath = path.substring(mainPath.length + 1);

   button.addEventListener('click', event => {
      event.preventDefault();
      handlers.route(event, mainPath, subPath);
   });
};

lib.bindCheckbox = checkbox => {
   const path = checkbox.dataset.app;
   const mainPath = path.split('/')[0];
   const subPath = path.substring(mainPath.length + 1);

   checkbox.addEventListener('click', event => {
      handlers.route(event, mainPath, subPath);
   });
};

// Get each elements and set the dom attribute
lib.init = () => {
   for (const key in lib.ele) {
      if (lib.ele.hasOwnProperty(key)) {
         lib.ele[key].dom = document.getElementById(key);
      }
   }
   lib.render();
   lib.bindButtons();
};

// Export module
export default lib;
