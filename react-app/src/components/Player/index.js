import React from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';
import {withStyles} from '@material-ui/core/styles';

const styles = {
    player: {
        height: '100%',
        display: 'flex',
        flexDirection: 'row'
    },
    
    playerContainer: {
        width: '100%',
        position: 'relative',
    },
    
    playerSection: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
    },
}
const Player = (props) => {
    const {classes, videoId, onReady, onStateChange} = props;
    return (
        <div className={classes.player}>
            <div className={classes.playerContainer}>
                <YouTube 
                    videoId={videoId} 
                    className={classes.playerSection}
                    opts={{
                        playerVars: {
                            autoplay: 1,
                            rel: 0
                        }
                    }}
                    onReady={(event) => {onReady(event.target)}}
                    onStateChange={(event) =>{ onStateChange(event.data) } }
                />
            </div>
        </div>
    );
}

Player.propTypes = {
    videoId: PropTypes.string.isRequired,
    onReady: PropTypes.func,
};


export default withStyles(styles)(Player);