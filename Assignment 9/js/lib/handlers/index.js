/**
 * Module for handlers
 */

// Imports
import signUp from './signUp.js';
import logIn from './logIn.js';
import settings from './settings.js';
import dashboard from './dashboard.js';
import list from './list.js';
import user from '../user.js';
import comp from '../comp.js';

// Container for module
const lib = {};

// Takes the event and send to handler
lib.route = (event, mainPath, subPath) => {
   switch (mainPath) {
      case 'signUp':
         signUp.route(subPath, event);
         break;
      case 'logIn':
         logIn.route(subPath, event);
         break;
      case 'logOut':
         lib.logOut();
         break;
      case 'settings':
         settings.route(subPath, event);
         break;
      case 'dashboard':
         dashboard.route(subPath, event);
         break;
      case 'list':
         list.route(subPath, event);
         break;
      default:
         console.log('ERROR: route does not exist');
         break;
   }
};

// Single routes
lib.logOut = () => {
   user.id = '';
   comp.ele.spa.display = 'none';
   comp.ele.modal.display = 'block';
   comp.ele.modalMenu.display = 'block';
   comp.ele.modalForm.display = 'none';
   comp.render();
};

// Export module
export default lib;
