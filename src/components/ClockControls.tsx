import { useRef } from "react";
import { ClockState } from "./Clock";


export default function ClockControls(
    props: { 
        state: ClockState,
        setIsRunning: (isRunning: boolean) => void
        setDisplayedValue: (value: number) => void
        tickDisplayedValue: () => void
    }
) {
    const intervalRef = useRef(0)
    const audioContextRef = useRef<AudioContext | null>(null)

    function beep() {
        return new Promise<void>((resolve) => {
            if (audioContextRef.current) {
                const gain = new GainNode(audioContextRef.current);
                gain.connect(audioContextRef.current.destination);
                gain.gain.value = 0.1;
        
                const oscillator = new OscillatorNode(audioContextRef.current);
                oscillator.connect(gain);
                oscillator.frequency.value = 1000;
    
                oscillator.start();  
                setTimeout(() => {
                    oscillator.stop()
                    resolve()
                }, 50) 
            }
        })         
    }

    if (props.state.displayedValue === 0) {
        (async () => {
            await beep()
            await new Promise(resolve => setTimeout(resolve, 75))
            await beep()
        })()
    }
    
    return (
        <section>
            <button 
                disabled={props.state.isRunning}
                onClick={() => {
                    props.setIsRunning(true)

                    intervalRef.current = setInterval(() => {
                        props.tickDisplayedValue()
                    }, 1000)

                    audioContextRef.current = new AudioContext();
    
               
                }}
            >start</button>

            <button 
                disabled={!props.state.isRunning}
                onClick={() => {
                    props.setIsRunning(false)
                    clearInterval(intervalRef.current)
                }}
            >stop</button>

            <button 
                onClick={() => {
                    props.setDisplayedValue(props.state.pickedValue)
                    
                    if (props.state.isRunning) {
                        clearInterval(intervalRef.current)
                        intervalRef.current = setInterval(() => {
                            props.tickDisplayedValue()
                        }, 1000)
                    } 
                }}
            >reset</button>
        </section>
    )
}