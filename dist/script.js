//USE YOUR API KEY
const api = "d4a7cf6f5d9fc06c8f268a0ed3d4bd16";

let cityID = "1275004";
const unit = "metric";
const lang = "en";
let city = "";
let URL = `http://api.openweathermap.org/data/2.5/weather?id=${cityID}&appid=${api}&units=${unit}&lang=${lang}`;
let URL2 = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`;

const input = document.querySelector("input");
const button = document.querySelector("button");

async function checkCity(cityName) {
  try {
    URL2 = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api}`;
    const response = await fetch(URL2);
    const data = await response.json();
    cityID = data?.id;
    city = data?.name;
    if (!city) {
      const body = document.querySelector("body");
      body.innerHTML = `<div
      id="button-and-input"
      class="mt-[200px] flex justify-center items-center"
    >
      <input
        value=""
        name="city"
        type="text"
        class="rounded-md border-none"
        placeholder="Enter city name"
      />
      <button class="bg-[#fbfff1] rounded-md ml-5">Show weather</button>
    </div>
    <div class="mt-8 flex justify-center items-center">
      <div
        style="padding-top: 40px"
        id="main-div"
        class="bg-weather-yellow text-302D5A w-[780px] h-[366px] rounded-[10px] flex-row justify-end pl-[50px] pr-[50px] pb-[55px]"
      >
        <div
          class="bg-weather-violet text-weather-yellow flex justify-center rounded-[10px] text-[38px] mt-[20px]"
        >
          <h1>ERROR</h1>
        </div>
        <div style="margin-top: 38px" class="flex flex-col justify-center items-center">
          <img src="../assets/error.png" alt=":<" />
          <h1 style="margin-top: 22px"class="text-[38px]">Can't find location please refresh</h1>
        </div>
      </div>
    </div>`;
    } else {
      //get variables from api
      URL = `http://api.openweathermap.org/data/2.5/weather?id=${cityID}&appid=${api}&units=${unit}&lang=${lang}`;
      const response2 = await fetch(URL);
      const data2 = await response2.json();
      city = data2?.name;
      const atmos = data?.weather[0]?.main;
      const icon = data?.weather[0]?.icon;
      const avgtemp = Math.round(parseInt(data?.main?.temp) - 273.15);
      const feelslike = Math.round(parseInt(data?.main?.feels_like) - 273.15);
      const cloudPer = data?.clouds?.all;
      const windSpeed = data?.wind?.speed;
      const highTemp = Math.round(parseInt(data?.main?.temp_max) - 273.15);
      const lowTemp = Math.round(parseInt(data?.main?.temp_min) - 273.15);
      const sunrise = data?.sys?.sunrise;
      const sunset = data?.sys?.sunset;
      const dateRise = new Date(sunrise * 1000);
      const sunriseTime = dateRise.toLocaleTimeString(navigator.language, {
        hour: "2-digit",
        minute: "2-digit",
      });
      const dateSet = new Date(sunset * 1000);
      const sunsetTime = dateSet.toLocaleTimeString(navigator.language, {
        hour: "2-digit",
        minute: "2-digit",
      });

      //display variables in html
      const cityName = document.getElementById("city-name");
      cityName.textContent = city;

      const atmosphere = document.getElementById("atmosphere");
      atmosphere.textContent = atmos;

      const temp = document.getElementById("avg-temp");
      temp.textContent = `${avgtemp}°C`;

      const feels = document.getElementById("feels-like");
      feels.textContent = `feels like ${feelslike}°C`;

      const pic = document.getElementById("weather-pic");
      pic.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;

      const cloud = document.getElementById("cloud");
      console.log(cloud);
      // console.log(cloudPer);
      cloud.textContent = `${cloudPer}% Cloudy`;

      const windSpeedKmph = document.getElementById("wind");
      windSpeedKmph.textContent = `${(windSpeed * 3.6).toFixed(
        1
      )}km/h Wind Speed`;

      const highLow = document.getElementById("high-low");
      highLow.textContent = `${highTemp}°/${lowTemp}°`;

      const rise = document.getElementById("sunrise");
      rise.textContent = sunriseTime;

      const set = document.getElementById("sunset");
      set.textContent = sunsetTime;
    }
  } catch (error) {
    console.log(error);
  }
}

button.addEventListener("click", () => {
  const cityName = input.value;
  checkCity(cityName);
});
