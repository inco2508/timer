import { useState } from "react"
import TimePicker from "./TimePicker"
import TimeDisplay from "./TimeDisplay"
import ClockControls from "./ClockControls"


export interface ClockState {
    isRunning: boolean,
    pickedValue: number,
    displayedValue: number
}

export default function Clock() {
    const [state, setState] = useState<ClockState>({
        isRunning: false,
        pickedValue: 0,
        displayedValue: 0,
    })

    function setIsRunning(isRunning: boolean) {
        setState(state => ({
            ...state,
            isRunning: isRunning
        }))
    }

    function setPickedValue(value: number) {
        setState(state => ({
            ...state,
            pickedValue: value
        }))
    }

    function setDisplayedValue(value: number) {
        setState(state => ({
            ...state,
            displayedValue: value
        }))
    }

    function tickDisplayedValue() {
        setState(state => ({
            ...state,
            displayedValue: {...state}.displayedValue - 1000
        }))
    }
    
    return (
        <>
            {!state.isRunning 
                ? <TimePicker 
                    state={state}
                    setPickedValue={setPickedValue}
                    setDisplayedValue={setDisplayedValue}
                />
                : <TimeDisplay state={state} />
            }
           
            <ClockControls 
                state={state}
                setIsRunning={setIsRunning}
                setDisplayedValue={setDisplayedValue}
                tickDisplayedValue={tickDisplayedValue}
            />
        </>
    )
}