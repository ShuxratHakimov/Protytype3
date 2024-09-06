
let currCity = null;
let units = "metric";

let city = document.querySelector(".city");
let datetime = document.querySelector(".date");
let description = document.querySelector('.description-text');
let temperature = document.querySelector(".temp");
let wind = document.querySelector(".wind-speed");
let humidity = document.querySelector(".humidity")
let visibility = document.querySelector('.visibility-distance');

if (localStorage.city_name){
    const  current_app = document.querySelector('.test_weather')

    const weather_body = `
       <div class="city-date-section">
       <h2 class="city">${localStorage.city_name}</h2>
       <p class="date">${localStorage.weather_when}</p>
   </div>
   <div class="temperature-info">
       <div class="description">
           <i class="material-icons">sunny</i>
           <span class="description-text">${localStorage.weather_description}</span>
       </div>
       <div class="temp">${localStorage.weather_temperature}°</div>
   </div>
   <div class="additional-info">
       <div class="wind-info">
           <i class="material-icons">air</i>
           <div>
               <h3 class="wind-speed">${localStorage.weather_wind} KM/H</h3>
               <p class="wind-label">Wind</p>
           </div>
       </div>
       <div class="humidity-info">
           <i class="material-icons">water_drop</i>
           <div>
               <h3 class="humidity">${localStorage.weather_humidity}%</h3>
               <p class="humidity-label">humidity</p>
           </div>
       </div>
       <div class="visibility-info">
           <i class="material-icons">visibility</i>
           <div>
               <h3 class="visibility-distance">${localStorage.weather_visibility} KM/H</h3>
               <p class="visibility">Visibility</p>
           </div>
       </div>
   </div>
       `;


    current_app.innerHTML = weather_body;
}


document.querySelector(".search-form").addEventListener("submit", (e) => {
    let search = document.querySelector(".city-input");
    
    e.preventDefault();
    
    currCity = search.value;
    
    getWeather();
    
    search.value = "";
  });
  
  function convertTimeStamp(timestamp, timezone) {
    const date = new Date(timestamp * 1000);
    const options = {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      timeZone: "Asia/Tashkent", 
    };
  
    return date.toLocaleString("uz-UZ", options);
  }
  
  function getWeather() {
    const API_KEY = "6aa91911a619bdc12c872d6ed280f5c9";
  
    
    if (!currCity || !units) {
      console.error("City or units are not specified!");
      return;
    }
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${currCity}&appid=${API_KEY}&units=${units}`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("City not found");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        saveData(data, data.name);
        LocalStorage(data);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  }
  
  function storeInLocal(data_d) {
   
    Object.keys(data_d).forEach(function (key) {
      localStorage.setItem(key, data_d[key]);
    });
  }
  
  function LocalStorage(jsonData) {
    let date = convertTimeStamp(jsonData.dt, jsonData.timezone);
    console.log(date);
    var array_data = {
      city_name: jsonData.name,
      weather_description: jsonData.weather[0].description,
      weather_temperature: jsonData.main.temp,
      weather_wind: jsonData.wind.speed,
      weather_humidity: jsonData.main.humidity,
      weather_pressure: jsonData.main.pressure,
      weather_visibility: jsonData.visibility,
      weather_when: date,
    };
    storeInLocal(array_data);
  }
  
  const saveData = (data, cityName) => {
    try {
     
      const jsonData = JSON.stringify(data);
  
      console.log(jsonData)
      
      fetch("saveData.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonData,
      })
        .then((response) => response.text())
        .then((data) => {
          console.log("Ma'lumotlar PHP-ga muvaffaqiyatli yuborildi:", data);
          window.location.href = "index.php?cityname=" + cityName;
        })
        .catch((error) => {
          console.error("Xatolik yuz berdi:", error);
        });
    } catch (error) {
      console.error("Xatolik:", error);
    }
  };
  
  document.body.addEventListener("load", getWeather());
  