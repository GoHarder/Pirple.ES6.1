/**
 * var:
 *
 * 1. Are processed before any code is executed (hoisting).
 * 2. The var is constrained in the
 * 3. A var can be created without a value and then assigned one.
 */

var value1 = 1;

if (value1 === 1) {
   var value1 = 2;
   console.log('var log 1:', value1);
}

console.log('var log 2:', value1);

/**
 * let:
 *
 * 1. A let can be created without a value and then assigned one.
 * 2. The value is limited to the location (block) to where it is used.
 */

let value2 = 1;

if (value2 === 1) {
   let value2 = 2;
   console.log('let log 1:', value2);
}

console.log('let log 2:', value2);

/**
 * const:
 *
 * 1. The const declaration creates a read only value.
 * 2. A new value can't be assigned to the variable.
 * 3. It must be created with a value.
 */

const value3 = 1;

try {
   value3 = 2;
} catch (error) {
   console.log('const log 1:', error);
}

console.log('const log :2', value3);
