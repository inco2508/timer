import { useState } from "react"
import './App.css'
import ClockControls from "./components/ClockControls"
import TimePicker from "./components/TimePicker"
import TimeDisplay from "./components/TimeDisplay"

export interface ClockState {
    isRunning: boolean,
    pickedValue: number,
    displayedValue: number
}

function App() {
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

export default App