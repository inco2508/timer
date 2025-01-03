import { useRef } from "react";
import { ClockState } from "../App";


export default function ClockControls(
    props: { 
        state: ClockState,
        setIsRunning: (isRunning: boolean) => void
        setDisplayedValue: (value: number) => void
        tickDisplayedValue: () => void
    }
) {
    const intervalRef = useRef(0)

    return (
        <section>
            <button 
                disabled={props.state.isRunning}
                onClick={() => {
                    props.setIsRunning(true)

                    intervalRef.current = setInterval(() => {
                        props.tickDisplayedValue()
                    }, 1000)
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