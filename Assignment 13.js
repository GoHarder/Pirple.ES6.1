class Vehicle {
   constructor(_make, _model, _year, _weight) {
      this.make = _make;
      this.model = _model;
      this.year = _year;
      this.weight = _weight;
      this.needsMaintenance = false;
      this.tripsSinceMaintenance = 0;
   }
}

class Car extends Vehicle {
   constructor(_make, _model, _year, _weight) {
      super(_make, _model, _year, _weight);
      this.isDriving = false;
   }

   drive() {
      this.isDriving = true;
      this.tripsSinceMaintenance++;
      this.needsMaintenance = this.tripsSinceMaintenance > 100;
   }

   stop() {
      this.isDriving = false;
   }

   repair() {
      this.tripsSinceMaintenance = 0;
      this.needsMaintenance = false;
   }
}

const mustang = new Car('Ford', 'Mustang', 2016, '1 ton');
const corvette = new Car('Chevrolet', 'Corvette', 2020, '1 ton');
const challenger = new Car('Dodge', 'Challenger', 2019, '1 ton');

for (let i = 0; i < 50; i++) {
   challenger.drive();
   challenger.stop();
}

for (let i = 0; i < 101; i++) {
   mustang.drive();
   mustang.stop();
   corvette.drive();
   corvette.stop();
}

corvette.repair();

console.log(mustang);
console.log(corvette);
console.log(challenger);
