/**
 * ENGINEER NOTE:
 * FOR: SYSTEM SETUP
 * 1. Create a new Elevator object for each car in the system
 *    Input a name, the top floor, and the bottom floor.
 *
 * const carA = new Elevator('A', 9, -1);
 * const carB = new Elevator('B', 10, 0);
 *
 * 2. Group cars together to be used by a controller
 *
 * const group1 = [carA, carB];
 *
 * 3. Create a new Controller object and assign the group to the controller
 *
 * const cont1 = new Controller(group1);
 *
 * 4. Use methods listed below to hook up the buttons to the various desired tasks
 *
 * const floor10Up = cont1.call(10)
 */

class Elevator {
   constructor(name, topFlr, botFlr) {
      this.name = name;
      this.topFlr = topFlr;
      this.botFlr = botFlr;
      this.floor = botFlr;
      this.queue = [];
      this.tempTarget = null;
      this.tempMessage = null;

      // For floor by floor debugging
      // this.tempFloor = 0;

      setInterval(() => {
         this.floor = this.floor + this.direction;

         if (this.target === this.floor) {
            this.target = this.queue[0] !== undefined ? this.queue[0] : null;
         }

         // For floor by floor debugging
         //  if (this.target !== null) {
         //     if (this.tempFloor !== this.floor) {
         //        console.log(`Car ${this.name} at floor ${this.floor}`);
         //     }
         //  }

         if (this.queue.includes(this.floor)) {
            this.open();

            setTimeout(() => {
               this.close();
               this.moveMessage;
            }, 2000);
         }

         // For floor by floor debugging
         //  this.tempFloor = this.floor;
      }, 1000);
   }

   get moveMessage() {
      let message = null;
      let result = null;

      if (this.direction === 1) {
         result = this.queue.filter(floor => floor > this.floor).sort((a, b) => a - b)[0];
         message = `Elevator ${this.name} moving to ${result}`;
      } else {
         result = this.queue.filter(floor => floor < this.floor).sort((a, b) => b - a)[0];
         message = `Elevator ${this.name} moving to ${result}`;
      }

      if (message !== this.tempMessage && result !== undefined) {
         console.log(message);
         this.tempMessage = message;
      }
   }

   get direction() {
      if (this.target !== null) {
         if (this.target > this.floor) {
            return 1;
         } else if (this.target < this.floor) {
            return -1;
         } else {
            return 0;
         }
      } else {
         return 0;
      }
   }

   distance(floor) {
      let output = Math.max(floor, this.floor) - Math.min(floor, this.floor);

      if ((this.direction === 1 && floor < this.floor) || (this.direction === -1 && floor > this.floor)) {
         const penalty = (Math.max(this.floor, this.target) - Math.min(this.floor, this.target)) * 2;
         //  console.log(`Car ${this.name} output = ${output} penalty = ${penalty}`);

         output = output + penalty;
      }

      // console.log(`Car ${this.name} distance ${output}`);

      return output;
   }

   /**
    * ENGINEER NOTE:
    * FOR: ELEVATOR CAR
    * Plug this method to the emergency button
    */
   open() {
      this.queue = this.queue.filter(item => item !== this.floor);
      this.tempTarget = this.target;
      this.target = null;
      console.log(`Elevator ${this.name} opened door`);
   }

   /**
    * ENGINEER NOTE:
    * FOR: ELEVATOR CAR
    * Plug this method to the reset button
    */
   close() {
      this.target = this.tempTarget;
      this.tempTarget = null;
      console.log(`Elevator ${this.name} closed door`);
   }

   validFloor(floor) {
      return floor <= this.topFlr && floor >= this.botFlr;
   }

   /**
    * ENGINEER NOTE:
    * FOR: ELEVATOR CAR
    * Plug this method to the number floors
    * The floor number should be passed into the floor property
    */
   call(floor) {
      if (this.validFloor(floor)) {
         if (this.direction === 1) {
            this.target = floor > this.target ? floor : this.target;
         } else if (this.direction === -1) {
            this.target = floor < this.target ? floor : this.target;
         } else {
            this.target = floor;
         }

         this.queue.push(floor);
         this.moveMessage;
      }
   }
}

class Controller {
   constructor(group) {
      this.group = group;
   }

   /**
    * ENGINEER NOTE:
    * FOR: HALLWAY CONTROLS
    * Plug this method to elevator call buttons
    * The floor the button is on should be passed into the floor property
    * The fastest elevator car will arrive to the request
    */
   call(floor) {
      let activeCar;
      let carDistance;
      let distance = Infinity;

      this.group.forEach(car => {
         carDistance = car.distance(floor);

         if (car.validFloor(floor)) {
            if (distance > carDistance) {
               distance = carDistance;
               activeCar = car;
            }
         }
      });

      activeCar.call(floor);
   }
}
