import {setUp, getByKey, getFinalObj, onChange, errorsExist} from './states';
import {timeToSeconds} from './formatTime';

const mockSetState = jest.fn();
jest.mock('react', () => ({
    useState: initial => {
        return [initial, mockSetState]
    }
}));

let states, validationFunctions;

const types = {
    primary: {
        key: 'title',
        label: 'Title',
        validationFunction: () => true
    },
    secondary: [
        {
            key: 'time',
            label: 'Time',
            validationFunction: (time) => {
                try{
                    timeToSeconds(time);
                }catch(e){
                    return false;
                }
                return true;
            }
        },
        {
            key: 'bpm',
            label: 'BPM',
            validationFunction: (bpm) => {
                if(isNaN(bpm) ){
                    return false;
                }
                else if(bpm <= 0 || bpm > 500){
                    return false;
                }
                return true;
            }
        }
    ]
}

const checkState = (state, label, value, error) => {
    expect(state).toMatchObject({label, value, error});
}

describe('test state functions', () => {
    it('should properly setup state based on a type object', () => {
        states = {};
        validationFunctions = {};
        const testObj = {title: 'test-title', time: '1:06', bpm: 168};
        setUp(states, validationFunctions, types, testObj);
        checkState(states['title'][0], 'Title', 'test-title', false);
        checkState(states['time'][0], 'Time', '1:06', false);
        checkState(states['bpm'][0], 'BPM', 168, false);
        for(var key in testObj){
            expect(validationFunctions).toHaveProperty(key);
        }
    });
    it('should get correct data by key', () => {
        const state = getByKey(states, 'title');
        checkState(state, 'Title', 'test-title', false);
    });
    it('should validate and change data by key', () => {
        onChange(states, validationFunctions, 'time', '2:00');
        expect(mockSetState).toHaveBeenCalledWith(
            {label:'Time', value: '2:00', error: false}
        )
        onChange(states, validationFunctions, 'time', '2:00s');
        expect(mockSetState).toHaveBeenCalledWith(
            {label:'Time', value: '2:00s', error: true}
        )
    });
    it('should detect errors in the state', () => {
        states['time'][0].value = '2:00s';
        states['time'][0].error = true;
        expect(errorsExist(states)).toBe(true);
    });
    it('should return a well-formatted object', () => {
        states['time'][0].value = '2:00';
        states['time'][0].error = true;
        const obj = getFinalObj(states);
        expect(obj).toMatchObject({title: 'test-title', time: '2:00', bpm: 168})
    })
});