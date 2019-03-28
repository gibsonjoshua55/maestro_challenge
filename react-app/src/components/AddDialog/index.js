import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import {setUp, errorsExist, getFinalObj, onChange, getByKey} from '../../utils/states';



const TextFields = ({states, validationFunctions}) => {
    const handleChange = (key) => {
        return (event ) => {onChange(states, validationFunctions, key, event.target.value)}
    }
    const textFields = [];
    var first = true;
    for(var key in states){
        const state = getByKey(states, key);
        textFields.push(<div key={`add-${key}`}><TextField
            autoFocus={first}
            id={`add-${key}`}
            label={state.label}
            error={state.error}
            onChange={handleChange(key)}
        /></div>)
        first=false;
    }
    return textFields;
}

const AddDialog = (props) => {
    const {open, onClose, types} = props;
    const states = [];
    const validationFunctions = [];
    setUp(states, validationFunctions, types, {});

    return (
        <div>
        <Dialog
            open={open}
            onClose={()=>onClose(undefined, undefined)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Add</DialogTitle>
            <DialogContent>
                <TextFields
                    states={states}
                    validationFunctions={validationFunctions} />
            </DialogContent>
            <DialogActions>
            <Button id='cancel' onClick={() => onClose(undefined)} color="primary">
                Cancel
            </Button>
            <Button id='submit' onClick={() => onClose(getFinalObj(states))} color="primary" autoFocus disabled={errorsExist(states)}>
                Add
            </Button>
            </DialogActions>
        </Dialog>
        </div>
    )
}

AddDialog.propTypes = {
    onClose: PropTypes.func,
    open: PropTypes.bool
}



export default AddDialog;