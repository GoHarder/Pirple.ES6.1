const men = ['Socrates', 'Plato', 'Leonardo', 'Raphael', 'Michelangelo', 'Donatello'];

const isMortal = name => {
   if (men.indexOf(name) > -1) {
      console.log(`All men are mortal`);
      console.log(`${name} is a man.`);
      console.log(`Therefore, ${name} is mortal.`);
   } else {
      console.log(`${name} is immortal.`);
   }
};

isMortal('Socrates');
