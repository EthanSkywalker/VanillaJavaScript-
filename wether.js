const weather = document.querySelector(".js-weather");

const API_KEY = "ed4e43073d9b5de177ee9a7c35b18705"
const COORDS = 'coords';

function getWeather(lat, lng){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json()
    }).then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature} @ ${place}`
    })

    //api 데이터를 얻는 방법은 fetch 를 사용하면 됨.
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude ,      // 위도
        longitude       // 경도
    }
    saveCoords(coordsObj);
    getWeather(latitude, longitude)
}

function handleGeoError(){
    console.log("Can't access geo location")
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError)            //navigator 라는 api 를 이용하여 location 을 받아 옴.
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    }else{
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude)
    }
}

function init(){
    loadCoords();
}
init();