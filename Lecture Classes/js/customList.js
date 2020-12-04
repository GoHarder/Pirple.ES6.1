export default class CustomList {
   constructor(_element) {
      this.element = _element;
      this.listItems = ['Item 1', 'Item 2', 'Item 3'];
   }

   // Makes a list item
   static listItem(text) {
      const li = document.createElement('li');
      li.innerHTML = text;
      return li;
   }

   // Adds an item
   add(text) {
      this.listItems.push(text);
      this.update();
   }

   // Remove an item
   remove(index) {
      this.listItems.splice(index, 1);
      this.update();
   }

   // Updates list dom
   update() {
      // Clear list
      while (this.element.firstChild) {
         this.element.removeChild(this.element.firstChild);
      }

      // Create list
      this.listItems.forEach(listItem => {
         this.element.appendChild(CustomList.listItem(listItem));
      });
   }
}
