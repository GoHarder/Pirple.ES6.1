// Imports
import form from './form.js';
import helpers from './helpers.js';

// Container for module
const lib = {};

lib.route = (path, event) => {
   lib[path](event);
};

lib.ele = {
   alarmForm: null,
   activeAlarms: null,
   oldAlarms: null
};

lib.add = () => {
   let payload = form.getData(lib.ele.alarmForm);
   payload = helpers.parseAlarm(payload);

   if (Notification.permission === 'default') {
      Notification.requestPermission();
   }

   const html = `
      <li class="alarm" data-time="${payload.time}" data-alarm-date="${payload.alarmDate}" data-alarm-time="${payload.alarmTime}">
         <span>${payload.displayDate} @ ${payload.displayTime}</span>
         <button data-path="edit">Edit</button>
         <button data-path="delete">Delete</button>
      </li>`;

   if (payload.alarmDate && payload.alarmTime) {
      lib.ele.activeAlarms.insertAdjacentHTML('afterbegin', html);
      form.bindButtons();
      form.clear(lib.ele.alarmForm);
   }
};

lib.edit = event => {
   const li = event.target.parentNode;
   let payload = li.dataset;
   payload = helpers.parseAlarm(payload);

   li.classList.remove('alarm');

   const html = `
      <form>
         <input type="date" name="alarmDate" value="${payload.alarmDate}" />
         <input type="time" name="alarmTime" value="${payload.alarmTime}" />
         <button data-path="save">save</button>
         <button data-path="cancel">cancel</button>
      </form>`;

   li.innerHTML = html;

   form.bindButtons();
};

lib.delete = event => {
   const li = event.target.parentNode;

   li.remove();
};

lib.save = () => {
   const editForm = event.target.parentNode;
   const li = editForm.parentNode;
   let payload = form.getData(editForm);
   payload = helpers.parseAlarm(payload);

   li.remove();

   const html = `
      <li class="alarm" data-time="${payload.time}" data-alarm-date="${payload.alarmDate}" data-alarm-time="${payload.alarmTime}">
         <span>${payload.displayDate} @ ${payload.displayTime}</span>
         <button data-path="edit">Edit</button>
         <button data-path="delete">Delete</button>
      </li>`;

   lib.ele.activeAlarms.insertAdjacentHTML('afterbegin', html);

   form.bindButtons();
};

lib.cancel = event => {
   const li = event.target.parentNode.parentNode;
   let payload = li.dataset;
   payload = helpers.parseAlarm(payload);

   const html = `
      <span>${payload.displayDate} @ ${payload.displayTime}</span>
      <button data-path="edit">Edit</button>
      <button data-path="delete">Delete</button>`;

   li.innerHTML = html;
   li.classList.add('alarm');

   form.bindButtons();
};

lib.init = () => {
   for (const key in lib.ele) {
      lib.ele[key] = document.getElementById(key);
   }

   let alarms = [];
   // let kill = false;

   const interval = setInterval(() => {
      alarms = document.querySelectorAll('.alarm');

      if (alarms.length !== 0) {
         // kill = true;

         alarms.forEach(alarm => {
            const time = parseInt(alarm.dataset.time);

            if (time < Date.now()) {
               lib.ele.oldAlarms.insertAdjacentHTML('afterbegin', `<li>${alarm.children[0].innerHTML}</li>`);
               const notification = new Notification('Alarm', { body: alarm.children[0].innerHTML });
               alarm.remove();

               setTimeout(() => {
                  notification.close.bind(notification);
               }, 4000);
            }
         });
      }

      // if (kill) {
      //    setTimeout(() => {
      //       clearInterval(interval);
      //    }, 10000);
      // }
   }, 1000);
};

// Export module
export default lib;
