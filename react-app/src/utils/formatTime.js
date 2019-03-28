import convertSeconds from 'convert-seconds';

const MAX_SECONDS = 60;
const SPS = 1;
const MAX_MINUTES = 60;
const SPM = SPS * MAX_SECONDS;
const MAX_HOURS = 24;
const SPH = SPM * MAX_MINUTES;
const MAX_DAYS = 2;
const SPD = SPH * MAX_HOURS;

export const secondsToTime =  (seconds) => {
    const timeObj = convertSeconds(seconds);
    const decimal = seconds %1;
    const decimalValue = Math.round(decimal*100);
    //remove trailing zero
    let decimalStr = decimalValue.toString();
    if(decimalStr.charAt(1) === "0"){
        decimalStr = decimalStr.substring(0,1);
    }
    let timeStr = "";
    if(timeObj.hours !== 0){
        timeStr += timeObj.hours + ":";
    }
    timeStr += (timeStr === "" ? timeObj.minutes : pad(timeObj.minutes, 2)) + ":";
    timeStr += pad(timeObj.seconds, 2);

    if(decimal !==0){
        timeStr += "."+decimalStr;
    }
    return timeStr;
}

export const timeToSeconds = (timeStr) => {
    if(!timeStr.match("^[0-9:.]*$")){
        throw new Error("contains unallowed characters");
    }
    const tokenized = timeStr.split(":");
    
    if(tokenized.length === 0){
        return 0;
    }
    const seconds = parseUnit(tokenized, 0, MAX_SECONDS);
    const minutes = parseUnit(tokenized, 1, MAX_MINUTES);
    const hours = parseUnit(tokenized, 2, MAX_HOURS);
    const days = parseUnit(tokenized, 3, MAX_DAYS);

    const totalTime = (seconds * SPS) + (minutes * SPM) + (hours * SPH) + (days * SPD);

    return totalTime;
}

const parseUnit = (tokenizedTime, position, maxValue) => {
    if(tokenizedTime.length > position) {
        const unitStr = tokenizedTime[tokenizedTime.length - (position + 1)]
        const parsedUnit = Number(unitStr);
        if(isNaN(parsedUnit)) {
            throw Error("Not a number");
        }
        else if(parsedUnit < 0){
            throw Error("Negative number not accepted");
        }
        else if(parsedUnit >= maxValue) {
            throw Error("Too high a value");
        }
        else {
            return parsedUnit;
        }
    }
    return 0;
}

function pad(number, length) {
   
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
   
    return str;

}