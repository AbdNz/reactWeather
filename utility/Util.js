export function getDirection(value) {
    var val = Math.floor((value / 22.5) + 0.5);
    var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return arr[(val % 16)];
}

export async function getForecastData(type, latitude, longitude, city) {
    var requestUrl = null;

    var apiKey = "52a3a122fb5328e9cbbed672e53f4be5";

    if (city != undefined) {
        requestUrl = "https://api.openweathermap.org/data/2.5/"+type+"?q="+city+"&units=metric&appid="+apiKey;
    } else {
        requestUrl = "https://api.openweathermap.org/data/2.5/"+type+"?lat="+latitude+"&lon="+longitude+"&units=metric&appid="+apiKey;
    }

    return fetch(requestUrl)
      .then((response) => response.json())
      .then((responseJson) => {
          console.log("RequestUrl: \n"+requestUrl);
          
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
}

export function getDescription(utcTime, description) {
    description = description.charAt(0).toUpperCase() + description.slice(1);
    currentDay = new Date().getDay()
    var date = new Date(utcTime*1000)
    day = date.getDay();

    if(day == currentDay) {
        return "Today · "+description
    } else {
        return DayMap[day]+" · "+description
    }
}

export const ForecastType = Object.freeze({"current":"weather", "forecast5":"forecast", "forecast16":"forecast/daily"})
export const DayMap = Object.freeze({0: "Sun", 1:"Mon", 2:"Tue", 3:"Wed", 4:"Thu", 5:"Fri", 6:"Sat"})