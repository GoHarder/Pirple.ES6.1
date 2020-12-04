let i = 0;

do {
   let out = i;

   if (i % 3 === 0 && i !== 0) {
      out = 'Fizz';
   }

   if (i % 5 === 0 && i !== 0) {
      out = out === i ? 'Buzz' : `${out}Buzz`;
   }

   console.log(out);
   i++;
} while (i < 101);
