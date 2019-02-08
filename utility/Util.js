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

}