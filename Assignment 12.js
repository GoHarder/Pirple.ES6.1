/**
 * Object oriented programming is a useful way to organize your code into a group.
 * It is also useful if you want to create an instance of something that has a similar structure but with a few different variables.
 * The code below is an great example of how you can turn the Local Storage or the Session storage of the browser into a Mongodb like database with different collections.
 */

/**
 * In the first project there was a requirement to store users, lists, and list items with the class object below you can create multiple objects that recycles the code.
 * All you would have to do is to create a new object like so.
 *
 * const users = new Storage('local', 'users');
 * const lists = new Storage('local', 'lists');
 * const listItems = new Storage('local', 'listItems');
 *
 * Along with that object you can store object 'documents' into local storage or session storage like so.
 *
 * const user = {
 *    firstName: John,
 *    lastName: Doe,
 *    email: jdoe@mail.com,
 *    password: Password#1
 *    tos: true
 * }
 *
 * Along with the external methods below you can easily manage these 'documents' along with an _id attribute that gets injected into the document for easy use.
 * Below in the code comments documents what each method does.
 */

//------------STORE CODE------------

/**
 * Creates a 'database' in Local Storage or Session Storage to store 'documents'
 */

export default class Storage {
   constructor(_location, _key) {
      this.location = _location;
      this.key = _key;

      const data = this._get();

      if (!data) {
         this._set({});
      }
   }

   /**
    * External Methods
    */

   // Inserts a single document into the store
   insertOne(doc) {
      const data = this._get();
      const _id = this._id();
      let output = false;

      if (!doc.hasOwnProperty('_id')) {
         doc = { _id, ...doc };
         data[_id] = doc;
         this._set(data);
         output = true;
      }

      return output;
   }

   // Finds multiple documents based on the query
   find(query) {
      const data = this._get();
      let output = [];

      for (const key in data) {
         output.push(data[key]);
      }

      query.forEach(rule => {
         const ruleKey = rule.split('=')[0];
         const ruleValue = rule.split('=')[1];
         output = output.filter(doc => doc[ruleKey] === ruleValue);
      });

      return output;
   }

   // Finds the first document based on the query
   findOne(query) {
      return this.find(query).length !== 0 ? this.find(query)[0] : false;
   }

   // Finds the first document based on the query and deletes it
   findOneAndDelete(query) {
      const data = this._get();
      const doc = this.findOne(query);
      let output = false;

      if (doc) {
         delete data[doc._id];
         this._set(data);
         output = true;
      }

      return output;
   }

   // Find a document and update it
   updateOne(doc) {
      const data = this._get();
      const _id = doc._id;
      let output = false;

      if (_id) {
         const oldDoc = this.findOne([`_id=${_id}`]);

         if (oldDoc) {
            data[_id] = doc;

            this._set(data);
            output = true;
         }
      }

      return output;
   }

   /**
    * Internal Methods
    */

   // Get data out of Local Storage and make into an object
   _get() {
      let output = false;

      if (this.location === 'session') {
         output = sessionStorage.getItem(this.key);
      } else if (this.location === 'local') {
         output = localStorage.getItem(this.key);
      }

      output = JSON.parse(output);
      return output;
   }

   // Take data object make it into a string and put into Local Storage
   _set(data) {
      data = JSON.stringify(data);

      if (this.location === 'session') {
         output = sessionStorage.setItem(this.key, data);
      } else if (this.location === 'local') {
         output = localStorage.setItem(this.key, data);
      }
   }

   // Create an id for each document to be stored
   _id() {
      const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
      let output = '';

      for (let i = 1; i <= 20; i++) {
         const character = characters.charAt(Math.floor(Math.random() * characters.length));
         output += character;
      }

      return output;
   }
}
