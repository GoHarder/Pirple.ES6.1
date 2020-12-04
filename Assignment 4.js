const isMortal = name => {
   const men = ['Socrates', 'Plato', 'Leonardo', 'Raphael', 'Michelangelo', 'Donatello'];

   name = typeof name === 'string' && name.trim().length > 0 ? name.trim() : false;

   if (name) {
      return men.indexOf(name) > -1;
   }

   return false;
};

console.log('Socrates:', isMortal('Socrates'));
console.log('Pineapple:', isMortal('Pineapple'));
console.log('0:', isMortal(0));
