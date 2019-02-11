export function getDirection(value) {
    var x = parseInt(value);
    switch (true) {
        case 0: return "N";
        case (x>0 && x<45): return "NNE";
        case 45: return "NE";
        case (x>45 && x<90): return "ENE";
        case 90: return "E";
        case (x>90 && x<135): return "ESE";
        case 135: return "SE";
        case (x>135 && x<180): return "SSE";
        case 180: return "S";
        case (x>180 && x<225): return "SSW";
        case 225: return "SW";
        case (x>225 && x<270): return "WSW";
        case 270: return "W";
        case (x>270 && x<315): return "WNW";
        case 315: return "NW";
        case (x>315 && x<360): return "NNW";
        case 360: return "N"
    }
}

export function getTime(value) {
    var d = new Date(value*1000);
    console.log(d)
    console.log("Hours: "+d.getHours());
    console.log("Minutes: "+d.getMinutes());
    console.log("Seconds: "+d.getSeconds());
}

export async function getForecastData(type, latitude, longitude, city) {
    var requestUrl = null;

    var apiKey = "086ca0166ede3e1c8dd20679d42bc3e9";

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

export const ForecastType = Object.freeze({"current":"weather", "forecast5":"forecast", "forecast16":"forecast/daily"})
export const DayMap = Object.freeze({0: "Sun", 1:"Mon", 2:"Tue", 3:"Wed", 4:"Thu", 5:"Fri", 6:"Sat"})