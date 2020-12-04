let colors = document.getElementsByClassName('color');

function toArray(obj) {
   var array = [];

   for (var i = obj.length >>> 0; i--; ) {
      array[i] = obj[i];
   }
   return array;
}

colors = toArray(colors);

console.log('Here are the rectangle IDs');

colors.forEach(color => {
   console.dir(color.id);
});
