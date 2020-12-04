import CustomList from './customList.js';

window.onload = () => {
   console.log('Window Loaded');

   const list = document.getElementById('list');
   const customList = new CustomList(list);
   customList.update();

   console.log('Old List Items Removed New Added');

   customList.add('potato');
   customList.add('orange');
   customList.remove(2);
};
