const validSingleUnits = ['second', 'minute', 'hour', 'day'];
const validPluralUnits = ['seconds', 'minutes', 'hours', 'days'];
const validUnits = [...validPluralUnits, ...validSingleUnits];

const timeAdder = (value1, label1, value2, label2) => {
   value1 = validInteger(value1);
   label1 = validString(label1) && validUnits.indexOf(label1) > -1 ? label1 : false;
   value2 = validInteger(value2);
   label2 = validString(label2) && validUnits.indexOf(label2) > -1 ? label2 : false;

   let value3 = false;
   let output = false;

   // Validate Parameters
   if (value1 && label1 && value2 && label2) {
      // Convert to seconds
      value1 = toSeconds(value1, label1);
      value2 = toSeconds(value2, label2);

      if (value1 && value2) {
         value3 = value1 + value2;
         output = timeUnits(value3);
      }
   }

   return output;
};

const toSeconds = (value, label) => {
   value = validInteger(value);
   label = validString(label) && validUnits.indexOf(label) > -1 ? label : false;
   output = false;

   // Validate Parameters
   if (value && label) {
      if (validSingleUnits.indexOf(label) > -1) {
         value = value === 1 ? value : false;
      } else {
         value = value !== 1 ? value : false;
      }

      if (value) {
         // Convert to seconds
         switch (label) {
            case 'minute':
            case 'minutes':
               output = value * 60;
               break;

            case 'hour':
            case 'hours':
               output = value * 3600;
               break;

            case 'day':
            case 'days':
               output = value * 86400;
               break;

            default:
               output = value;
               break;
         }
      }
   }

   return output;
};

const timeUnits = value => {
   value = validInteger(value);

   const units = [
      { name: 'minute', time: 60 },
      { name: 'hour', time: 60 },
      { name: 'day', time: 24 }
   ];
   let label = 'seconds';
   let output = false;

   if (value) {
      units.forEach(unit => {
         if (value % unit.time === 0) {
            value = value / unit.time;
            label = `${unit.name}${value !== 1 ? 's' : ''}`;
         }
      });

      output = [value, label];
   }

   return output;
};

const validInteger = integer => (typeof integer === 'number' && integer >= 0 && integer && Number.isInteger(integer) ? integer : false);
const validString = string => (typeof string === 'string' && string.trim().length > 0 ? string.trim() : false);

console.log('True Test 1:', timeAdder(1, 'minute', 3, 'minutes'));
console.log('True Test 2:', timeAdder(5, 'days', 25, 'hours'));
console.log('True Test 3:', timeAdder(1, 'minute', 240, 'seconds'));
console.log('True Test 4:', timeAdder(5, 'days', 5, 'days'));
console.log('True Test 5:', timeAdder(12, 'hours', 12, 'hours'));

console.log('False Test 1:', timeAdder(5, 'hour', 5, 'minutes'));
console.log('False Test 2:', timeAdder(false, false, 5, 'minutes'));
console.log('False Test 3:', timeAdder({}, 'days', 5, 'minutes'));
