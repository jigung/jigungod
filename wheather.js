const weather = document.querySelector(".js-weather");

const API_KEY = 'd1a3a6ca28e0e22ee81167734a46e65b';
const COORDS = "coords";

function getWeather(lat, lng){
    fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
        )
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            const temperature = json.main.temp;
            const place = json.name;
            weather.innerText = `${temperature} @ ${place}`;
        }); 
} 

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
     latitude,
     longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log("날씨정보를 읽는데 오류가 생겼습니다.")
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null) {
        askForCoords();
    } else {
       const parsedCoords = JSON.parse(loadedCoords);
       getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init() {
    loadCoords();
    
}

init();