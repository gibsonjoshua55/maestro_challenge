import {useState} from 'react';

export const getByKey = (states, key) => {
    return states[key][0];
}
const setByKey = (states, key, value) => {
    const currentState = getByKey(states, key);
    states[key][1](Object.assign({label: currentState.label}, value));
}

const setUpType = (states, validationFunctions, type, obj) => {
    const {key, label} = type;
    states[key] = useState({value: obj[key], error: !type.validationFunction(obj[key]), label });
    validationFunctions[key] = type.validationFunction;
}

/**
 * Sets up state and validation functions accessible by corresponding
 * keys defined in the type.
 */
export const setUp = (states, validationFunctions, types, obj) => {
    if(types.primary){
        setUpType(states, validationFunctions, types.primary, obj);
    }
    if(types.secondary){
        types.secondary.forEach((type) => {
            setUpType(states, validationFunctions, type, obj);
        })
    }
} 
/**
 * Checks the states of all fields of the object to determine
 * if there are validation errors
 */
export const errorsExist = (states) => {
    for(var key in states){
        const {error} = getByKey(states, key);
        if(error)
            return true;
    }
    return false;
}

/**
 * Returns an object with all of the values for each type set by
 * their appropriate key in the object.
 */
export const getFinalObj = (states) => {
    const obj = {};
    for(var key in states){
        const {value} = getByKey(states, key);
        obj[key] = value;
    }
    return obj;
}

export const onChange = (states, validationFunctions, key, newValue) => {
    const validate = validationFunctions[key];
    if(validate(newValue)){
        setByKey(states, key, {value: newValue, error: false});
    }
    else{
        setByKey(states, key, {value: newValue, error: true});
    }
}