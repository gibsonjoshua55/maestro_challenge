import React from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import {withStyles} from '@material-ui/core/styles';


const styles = theme => ({
    root: {
        margin: theme.spacing.unit
    }
})
const LoopSelection = (props) => {
    const {value, updateValue, timestamps, helperText, children, id, filter, classes} = props;
    return(
        <FormControl className={classes.root}>
            <Select
                value={value}
                onChange={(event) => {
                    const time = event.target.value;
                    const timestamp = timestamps.find((t) => {
                        return t.time == time;
                    });
                    if(timestamp){
                        updateValue({value: time, bpm: timestamp.bpm}); 
                    }
                    else{
                        updateValue({value: time, bpm: undefined})
                    }
                    
                }}
                inputProps={{
                    id
                }}
            >
                {children}
                {
                    timestamps.filter(filter)
                        .map((timestamp) => {
                            return <MenuItem key={`${id}-${timestamp.id}`} value={timestamp.time}>
                                {timestamp.title}
                            </MenuItem>
                        })
                }
            </Select>
            <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
    )
}

LoopSelection.propTypes = {
    value: PropTypes.number,
    updateControls: PropTypes.func,
    timestamps: PropTypes.array,
    helperText: PropTypes.string,
    id: PropTypes.string,
    filter: PropTypes.func
}

export default withStyles(styles)(LoopSelection);