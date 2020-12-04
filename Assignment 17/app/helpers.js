// Container for module
const lib = {};

lib.parseAlarm = payload => {
   const { alarmDate, alarmTime } = payload;
   let displayDate = alarmDate.split('-');
   let displayTime = alarmTime.split(':');
   const hour = parseInt(displayTime[0]);

   const poo = `${alarmDate}T${alarmTime}`;

   let time = new Date(poo);
   time = Date.parse(time);

   displayDate = `${displayDate[1]}-${displayDate[2]}-${displayDate[0]}`;
   displayTime = `${hour > 12 ? hour - 12 : hour}:${displayTime[1]} ${hour > 12 ? 'PM' : 'AM'}`;

   payload = { ...payload, displayDate, displayTime, time };

   return payload;
};

// Export module
export default lib;
