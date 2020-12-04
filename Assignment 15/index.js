// Container for module
const lib = {};

// Config
lib.config = {
   apiKey: '9b8874df90e85e7f742b16a1aae22e21'
};

// Elements
lib.ele = {
   cityInput: null,
   info: null
};

// Get elements
lib.getEle = () => {
   for (const key in lib.ele) {
      lib.ele[key] = document.getElementById(key);
   }
};

// Bind all the buttons on the page
lib.bindButtons = () => {
   const buttons = document.querySelectorAll('button');
   buttons.forEach(button => {
      button.addEventListener('click', event => {
         event.preventDefault();
         const name = event.target.dataset.run;
         lib[name]();
      });
   });
};

// Fetch the data from the API
lib.fetchData = () => {
   const city = lib.ele.cityInput.value;
   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${lib.config.apiKey}`;

   lib.ele.info.innerHTML = '';

   fetch(url)
      .then(response => {
         return response.json();
      })
      .then(data => {
         lib.onData(city, data);
      })
      .catch(error => {
         console.log(error);
         lib.onError(city);
      });
};

// Show data after fetch
lib.onData = (city, data) => {
   console.log(data);

   const description = lib.titleCase(data.weather[0].description);
   const temp = `${Math.round(((data.main.temp - 273.15) * 9) / 5 + 32)}&#176; F`;
   const tempFeel = `${Math.round(((data.main.feels_like - 273.15) * 9) / 5 + 32)}&#176; F`;
   const wind = `${lib.windDirection(data.wind.deg)} ${(data.wind.speed * 2.237).toFixed(1)} mph`;

   const humidity = data.main.humidity;

   const msgHtml = `
      <button data-run="fetchData">Refresh</button>
      <h2>${city}</h2>
      <p>${temp}</p>
      <p>${description}</p>
      <div class="detail">
         <p>Feels Like: ${tempFeel}</p>
         <p>Wind: ${wind}</p>
      </div>
      <div class="detail">
         <p>Humidity: ${humidity}%</p>
      </div>`;

   lib.ele.info.insertAdjacentHTML('afterbegin', msgHtml);

   lib.bindButtons();
};

// Show error on fetch failure
lib.onError = city => {
   const msgHtml = `<p class="error">Sorry, we couldn't access the API</p>`;

   lib.ele.info.insertAdjacentHTML('afterbegin', msgHtml);
};

lib.titleCase = str => {
   let split = str.split(' ');

   split = split.map(word => word.charAt(0).toUpperCase() + word.substring(1));

   return split.join(' ');
};

lib.windDirection = deg => {
   let dirs = [
      { name: 'N', min: 0, max: 11.25 },
      { name: 'NNE', min: 11.25, max: 33.75 },
      { name: 'NE', min: 33.75, max: 56.25 },
      { name: 'ENE', min: 56.25, max: 78.75 },
      { name: 'E', min: 78.75, max: 101.25 },
      { name: 'ESE', min: 101.25, max: 123.75 },
      { name: 'SE', min: 123.75, max: 146.25 },
      { name: 'SSE', min: 146.25, max: 168.75 },
      { name: 'S', min: 168.75, max: 191.25 },
      { name: 'SSW', min: 191.25, max: 213.75 },
      { name: 'SW', min: 213.75, max: 236.25 },
      { name: 'WSW', min: 236.25, max: 258.75 },
      { name: 'W', min: 258.75, max: 281.25 },
      { name: 'WNW', min: 281.25, max: 303.75 },
      { name: 'NW', min: 303.75, max: 326.25 },
      { name: 'NNW', min: 326.25, max: 348.75 },
      { name: 'N', min: 348.75, max: 365 }
   ];

   dirs = dirs.filter(dir => deg <= dir.max && deg >= dir.min);

   return dirs[0].name;
};

// Init (bootstrapping)
lib.init = () => {
   lib.bindButtons();
   lib.getEle();
   lib.windDirection(11.25);
};

// Call the init processes after the window loads
window.onload = () => {
   lib.init();
};
