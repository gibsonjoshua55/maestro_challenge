import {playCountIn} from '../metronome';

const loopVideo = (player, setBufferCallback, controls, setControls) => {
    if(controls.loop){
        console.log(controls.loopEnd);
        let loopEnd, loopStart;
        if(controls.loopEnd.value === -2){
            loopEnd = player.getDuration();
            console.log(loopEnd);
        }
        else
            loopEnd = controls.loopEnd.value;
        
        if(controls.loopStart.value === -1)
            loopStart = 0;
        else
            loopStart = controls.loopStart.value;
        setTimeout(() =>{
            const diff = Math.abs(player.getCurrentTime()-loopEnd) < .5
            if(player.getPlayerState() !== 2 && diff ){
                playTimestamp(loopStart, controls.loopStart.bpm, player, setBufferCallback, controls, setControls)
            }
        },
        (loopEnd-loopStart)*1000 + 300 /*account for startup*/);
    }
}

export const playTimestamp = (time, bpm, player, setBufferCallback, controls, setControls) => {
    if(controls.countIn === true && bpm !== undefined && bpm !== null){
        player.playVideo();
        player.pauseVideo();
        player.seekTo(time);
        if(player.getPlayerState() === 3){
            setBufferCallback({callback: () => {
                playCountIn(bpm, () => {
                    player.playVideo();
                    loopVideo(player, setBufferCallback, controls, setControls);
                })
            }})
        }
        else{
            playCountIn(bpm, () => {
                player.playVideo();
                loopVideo(player, setBufferCallback, controls, setControls);
            })
        }
    }
    else{
        player.seekTo(time);
        if(player.getPlayerState() === 2){ //if paused
            player.playVideo();
        }
        loopVideo(player, setBufferCallback, controls, setControls);
    }
}

