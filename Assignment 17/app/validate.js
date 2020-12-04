/**
 * Module to handle data validation
 */

// Container for module
const lib = {};

// String tests
lib.string = value => {
   return typeof value === 'string' && value.trim().length > 0;
};

lib.email = value => {
   const regex = /[\w.%+\-]+@[\w.\-]+\.[A-Za-z]{2,}/;
   let output = false;

   if (lib.string(value)) {
      output = regex.test(value);
   }

   return output;
};

lib.name = value => {
   const regex = /^([A-Z][A-Za-z.'\-]+)$/;
   let output = false;

   if (lib.string(value)) {
      output = regex.test(value);
   }

   return output;
};

lib.password = value => {
   const regex = /^(?=.*[~!@#$%^&*()_\+\-\=])(?=.*\d)(?=.*[A-Z])(?=.*[a-z])\S{8,15}$/;
   let output = false;

   if (lib.string(value)) {
      output = regex.test(value);
   }

   return output;
};

// Boolean tests
lib.boolean = value => {
   return typeof value === 'boolean';
};

lib.isTrue = value => {
   let output = false;

   if (lib.boolean(value)) {
      output = value === true;
   }

   return output;
};

// Runs each value in the form using the above tests
lib.form = (payload, tests) => {
   let output = [];

   for (const key in payload) {
      if (payload.hasOwnProperty(key) && tests.hasOwnProperty(key)) {
         const value = payload[key];
         const valueTest = lib[tests[key].test];
         const error = tests[key].error;

         if (!valueTest(value)) {
            output.push(error);
         }
      }
   }

   return output;
};

// Export module
export default lib;
