/**
 * Module for data storage
 */

// Container for module
const lib = {};

lib.store = {
   users: {},
   lists: {},
   listItems: {}
};

lib.insertOne = (location, doc) => {
   const db = lib.store[location];
   let output = false;

   for (const key in doc) {
      if (!db.hasOwnProperty(key)) {
         db[key] = doc[key];
         output = true;
      }
   }

   lib.update();

   return output;
};

lib.find = (location, query) => {
   const db = lib.store[location];
   let output = false;

   if (db) {
      output = [];

      for (const key in db) {
         output.push(db[key]);
      }

      query.forEach(rule => {
         const ruleKey = rule.split('=')[0];
         const ruleValue = rule.split('=')[1];
         output = output.filter(doc => doc[ruleKey] === ruleValue);
      });
   }

   return output;
};

lib.findOne = (location, query) => (lib.find(location, query)[0] ? lib.find(location, query)[0] : false);

lib.findOneAndDelete = (location, query) => {
   let output = false;
   const doc = lib.findOne(location, query);
   const db = lib.store[location];

   if (doc) {
      delete db[doc.id];
      lib.update();
      output = true;
   }

   return output;
};

// Takes edits and passes them to local storage
lib.update = () => localStorage.setItem('data', JSON.stringify(lib.store));

// Pulls data from local storage if there is any and sets the store
lib.init = () => {
   let data = localStorage.getItem('data');

   if (data) {
      data = JSON.parse(data);
      lib.store = data;
   } else {
      lib.update();
   }
};

// Export module
export default lib;
