import React from 'react';
import PropTypes from 'prop-types';
import Switch from '@material-ui/core/Switch';
import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';
import Section from '../Section';
import {withStyles} from '@material-ui/core/styles';
import { Typography, MenuItem, Button } from '@material-ui/core';
import LoopSelection from './LoopSelection';


const styles = theme => ({
    switchSet: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        margin: theme.spacing.unit,
        height: 60
    },
    select: {
        width: 70
    }

})



const Controls = (props) => {
    const {classes, controls, setControls, timestamps, playTimestamp} = props;
    const updateControls = (update) => {
        const newControls = Object.assign({}, controls, update); 
        setControls(newControls);
    }
    return(
        <Section headerTitle='Playback Controls'>
            <Divider />
            <div className={classes.switchSet}>
                <Typography variant="h5">Count In:</Typography>
                <Tooltip title='Turn off Loop to change Count In settings'
                    placement='right-end'
                    disableHoverListener={!controls.loop}
                >
                    <Switch id='count-in-switch' 
                        checked={controls.countIn} 
                        onChange ={(event) => {
                            if(!controls.loop)
                                updateControls({countIn: event.target.checked}); 
                        }}
                        disableRipple={controls.loop}
                        color={controls.loop ? 'primary' : 'secondary'}
                        disabled={timestamps === undefined }
                    />
                </Tooltip>
                
            </div>
            { controls.countIn !== false &&
                <div>
                    <Typography variant="body1">This will add a four count entrance at the given BPM for each timestamp</Typography>
                </div>
            }
            
            <div className={classes.switchSet}>
                <Typography variant="h5">Loop:</Typography>
                <Switch id='loop-switch' 
                    checked={controls.loop} 
                    onChange ={(event) => {
                        updateControls({loop: event.target.checked}); 
                    }}
                    disabled={timestamps === undefined}
                />
                { controls.loop !== false &&
                    <React.Fragment>
                        <LoopSelection
                            timestamps={timestamps}
                            helperText='Choose the start of the loop'
                            updateValue={(value) => updateControls({loopStart: value})}
                            value={controls.loopStart.value}
                            filter={(timestamp) => {
                                if(controls.loopEnd.value === -2)
                                    return true;
                                
                                return (timestamp.time < controls.loopEnd.value)
                            }}
                            id='select-loop-start'
                        >
                            <MenuItem value={-1}>Start of Video</MenuItem>
                        </LoopSelection>
                        <LoopSelection
                            timestamps={timestamps}
                            helperText='Choose the end of the loop'
                            updateValue={(value) => updateControls({loopEnd: value})}
                            value={controls.loopEnd.value}
                            filter={(timestamp) => {
                                if(controls.loopStart.value === -1)
                                    return true;
                                
                                return (timestamp.time > controls.loopStart.value)
                            }}
                            id='select-loop-end'
                        >
                            <MenuItem value={-2}>End of Video</MenuItem>
                        </LoopSelection>
                        <Button id='start-loop-button' variant='contained' onClick={() => playTimestamp(controls.loopStart.value, controls.loopStart.bpm)}>Start</Button>
                    </React.Fragment>
                }
                
            </div>
            {
                controls.loop !== false &&
                    <Typography variant="body1"> To stop the loop, pause the video and manually adjust the time of the video</Typography>
            }
        </Section>
    )
}

Controls.propTypes = {
    controls: PropTypes.object,
    setControls: PropTypes.func,
    timestamps: PropTypes.array,
    playTimestamp: PropTypes.func,
}

export default withStyles(styles)(Controls);