import {timeToSeconds} from '../utils/formatTime'

export default {
    primary: {
        key: 'title',
        label: 'Title',
        validationFunction: (title) => title !== undefined && title !== ''
    },
    secondary: [
        {
            key: 'time',
            label: 'Time',
            validationFunction: (time) => {
                if(time === undefined || time === '')
                    return false;
                try{
                    timeToSeconds(time);
                }catch(e){
                    return false;
                }
                return true;
            },
        },
        {
            key: 'bpm',
            label: 'BPM',
            validationFunction: (bpm) => {
                if(bpm === undefined || bpm === null){
                    return true;
                }
                if(isNaN(parseInt(bpm)))
                {
                    return false;
                }
                return true;
            }
        }
    ]
}