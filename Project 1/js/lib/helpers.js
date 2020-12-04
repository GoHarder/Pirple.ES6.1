/**
 * Helpers for various tasks
 */

// Container for module
const lib = {};

// Create a random string of alphanumeric characters
lib.createRandomString = strLength => {
   strLength = typeof strLength == 'number' && strLength > 0 ? strLength : false;
   if (strLength) {
      // Define allowed characters in the string
      const possibleCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789';

      // Start the string
      let str = '';

      for (let i = 1; i <= strLength; i++) {
         // Get random character from possible characters
         const randomCharacter = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
         // Append the string
         str += randomCharacter;
      }
      return str;
   } else {
      return false;
   }
};

lib.errorHTML = errors => {
   let output = '<p>Error:</p>';

   errors.forEach(error => {
      output = `${output}\n<p>${error}</p>`;
   });

   return output;
};

// Export module
export default lib;
