import React, {useState} from 'react';
import { Route } from 'react-router-dom';
import Player from '../../components/Player';
import TimestampCollectionsContainer from './TimestampCollectionsContainer';
import TimestampsContainer from './TimestampsContainer';
import ControlsContainer from './ControlsContainer';
import queryString from 'query-string';
import { withStyles } from '@material-ui/core/styles';
import {playTimestamp} from '../../utils/playVideo';
import Typography from '@material-ui/core/Typography';

const styles = {
    watchContainer: {
        display: 'flex',
        flexFlow: 'row wrap',
        position: 'relative',
        height: '100%',
    },

    quadrant: {
        width: '50%',
        height: '50%',
    },
}

export const Watch = (props) => {
    const {location, classes } = props;
    const {search} = location;
    const query = queryString.parse(search); 
    const [player, setPlayer] = useState(undefined);
    const [timestampCollectionId, setTimestampCollectionId] = useState(undefined);
    const [controls, setControls] = useState({
        countIn: false, 
        loop: false, 
        loopStart: {value:-1, bpm: undefined},
        loopEnd: {value:-2, bpm: undefined}});
    const [playerState, setPlayerState] = useState(-1);
    const [bufferCallback, setBufferCallback] = useState({callback: () => {}});
    const onStateChange = (state) => {
        if(playerState === 3){
            bufferCallback.callback();
        }
        setPlayerState(state);  
    }
    
    const callPlayTimestamp = (time, bpm) => {
        playTimestamp(time, bpm, player, setBufferCallback, controls, setControls);
    }
    if(query.v !== undefined && query.v !== '' && query.v !== null){
        console.log(query.v)
        return(
            <div className={classes.watchContainer} >
                <div className={classes.quadrant}>
                    <Player videoId={query.v} onReady={(player) => {setPlayer(player)}} onStateChange={onStateChange}/>
                </div>
                <div className={classes.quadrant}>
                    <ControlsContainer 
                        timestampCollectionId={timestampCollectionId} 
                        controls={controls} 
                        setControls={setControls}
                        playTimestamp={callPlayTimestamp}
                    />
                </div>
                <div className={classes.quadrant}>
                    <TimestampCollectionsContainer
                        videoId={query.v}
                        onTimestampCollectionSelected={setTimestampCollectionId}
                        selectedId={timestampCollectionId}
                    />
                </div>
                <div className={classes.quadrant}>
                    <TimestampsContainer
                        timestampCollectionId={timestampCollectionId}
                        player={player}
                        playTimestamp={callPlayTimestamp}
                        playerState={playerState}
                        className='fillParent'
                        controls={controls}
                        disabled={controls.loop}
                    />
                </div>
            </div>
        );
    }
    else{
        return(
            <Typography variant='h1'>No video provided</Typography>
        )
    }
    

}

export default () => <Route exact path='/watch' component={withStyles(styles)(Watch)} />;