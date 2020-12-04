const step1 = (num, callback) => {
   let time = 0;
   let interval = setInterval(() => {
      time++;
   }, 1);

   console.log(`The square of ${num} = ${num ** 2}`);

   setTimeout(() => {
      callback(num, interval);
      console.log(`Total elapsed time = ${time} milliseconds`);
   }, num);
};

const step2 = (num, interval) => {
   let prime;

   console.log(`The square root of ${num} = ${Math.sqrt(num)}`);

   for (let i = 0; i < num; i++) {
      prime = isPrime(i) ? i : prime;
   }

   console.log(`The closest prime to ${num} = ${prime}`);
   clearInterval(interval);
};

const isPrime = value => {
   for (var i = 2; i < value; i++) {
      if (value % i === 0) {
         return false;
      }
   }
   return value > 1;
};

step1(16, step2);
