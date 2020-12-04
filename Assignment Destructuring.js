/**
 * Destructuring is a way to quickly "unpack" an object or array from a "container".
 * The difference between the two comes from the fact that objects and arrays store their content in different ways.
 * The main difference is that objects have keys to each value.
 */

/**
 * Destructuring arrays
 */

const x = [1, 2, 3, 4, 5];
const [y, z] = x;
console.log(y);
console.log(z);

/**
 * Destructuring objects
 */

const o = { p: 42, q: true };
const { p, q } = o;

console.log(p);
console.log(q);
