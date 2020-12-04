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

   // Inserts multiple documents into the store
   insertMany(docs) {
      let data = this._get();
      let hasId = false;
      let output = false;

      docs.forEach(doc => {
         if (doc.hasOwnProperty('_id')) {
            hasId = true;
         }
      });

      if (!hasId) {
         docs = docs.reduce((acc, value) => {
            let _id = this._id();
            value = { _id, ...value };
            acc[_id] = value;
            return acc;
         }, {});

         data = { ...docs, ...data };
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
         sessionStorage.setItem(this.key, data);
      } else if (this.location === 'local') {
         localStorage.setItem(this.key, data);
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
