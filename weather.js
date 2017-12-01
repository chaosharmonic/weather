var icons = {
  "clouds" : "wi-cloudy",
  "rain" : "wi-rain",
  "snow" : "wi-snow",
  "clear" : "wi-day-sunny",
  "clear-night" : "wi-night-clear",
  // "hail" : "wi-hail",
  "thunderstorms" : "wi-thunderstorm"
  // "wind" : "wi-"
  // "fog" : "wi-fog"
};

var link

var temp;
var tempStr;
var tempUnit = "C";
function displayTemp(){
  tempStr = Math.round(temp) + "°";
  $("#degrees").text(tempStr);
  $("#unit").text(tempUnit);
}
// function tempStyle(){
    // TODO: add classes to temperature that correspond to different color values
// }


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position){
          link = "https://fcc-weather-api.glitch.me/api/current?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude;
          getWeather();
            });
    } else {
        console.log("Geolocation not enabled");
    }
}

function getWeather(){
  $.getJSON(link, function(data) {
      temp = data.main.temp;
      tempStr = Math.round(temp) + "°";
      var desc = data.weather[0].main.toLowerCase();
        // TODO: night icon
        // if {desc === "clear" && local time is between 6pm and 4am}
        // desc = "clear-night";
      $("i").addClass(icons[desc]);
      $("#forecast").text(desc);
      displayTemp();
    });
}

$("h2:nth-of-type(2)").click(function(){
  if (tempUnit === "C") {
    temp = (temp*1.8) + 32;
    tempUnit = "F";
    displayTemp();
  }
  else {
    temp = (temp - 32)/1.8;
    tempStr = Math.round(temp) + "°";
    tempUnit = "C";
    displayTemp();
  }
});

getLocation();
