const step1 = async num => {
   let time = 0;
   let prime;
   const int = setInterval(() => {
      time++;
   }, 1);

   console.log(`The square of ${num} = ${num ** 2}`);

   const sqrtRes = await sqrt(num);

   console.log(`The square root of ${num} = ${Math.sqrt(sqrtRes)}`);

   for (let i = 0; i < num; i++) {
      prime = isPrime(i) ? i : prime;
   }

   console.log(`The closest prime to ${num} = ${prime}`);

   clearInterval(int);

   console.log(`Total elapsed time = ${time} milliseconds`);
};

const sqrt = num => {
   return new Promise((res, rej) => {
      setTimeout(() => {
         res(Math.sqrt(num));
      }, num);
   });
};

const isPrime = value => {
   for (var i = 2; i < value; i++) {
      if (value % i === 0) {
         return false;
      }
   }
   return value > 1;
};

step1(16);
