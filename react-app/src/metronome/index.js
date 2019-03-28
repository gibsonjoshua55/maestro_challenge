import Tone from 'tone';



export function playCountIn(bpm, callback){
    Tone.Transport.cancel(0);
    var synth = new Tone.Synth().toMaster();
    const triggerSynth = (time) => {
        synth.triggerAttackRelease('C4',0.1);
        
    }
    const final = () => {
        Tone.Transport.stop();
        callback();
    }
    Tone.Transport.schedule(triggerSynth, 0)
    Tone.Transport.schedule(triggerSynth, Tone.Time('4n'))
    Tone.Transport.schedule(triggerSynth, 2 *Tone.Time('4n'))
    Tone.Transport.schedule(triggerSynth, 3 * Tone.Time('4n'))
    Tone.Transport.schedule(final, 4 * Tone.Time('4n'))
    Tone.Transport.bpm.value = bpm;
    Tone.Transport.start();
}
