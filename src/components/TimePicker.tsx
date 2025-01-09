import { ChangeEvent, useState } from "react"
import { numberToHMS } from "../utils/utils"
import { ClockState } from "./Clock"


export default function TimePicker(
    props: {
        state: ClockState,
        setPickedValue: (value: number) => void,
        setDisplayedValue: (value: number) => void
    }
) {
    const [previousDisplayedValue, setPreviousDisplayValue] = useState(props.state.displayedValue)

    const hms = numberToHMS(previousDisplayedValue)

    const [hours, setHours] = useState(hms.hours)
    const [minutes, setMinutes] = useState(hms.minutes)
    const [seconds, setSeconds] = useState(hms.seconds)

    if (previousDisplayedValue != props.state.displayedValue) {
        setPreviousDisplayValue(props.state.displayedValue)

        const hms = numberToHMS(props.state.displayedValue)

        setHours(hms.hours)
        setMinutes(hms.minutes)
        setSeconds(hms.seconds)
    }

    function handleChange(hours: number, minutes: number, seconds: number) {    
        props.setPickedValue(hours * 1000 * 60 * 60 + minutes * 1000 * 60 + seconds * 1000)    
        props.setDisplayedValue(hours * 1000 * 60 * 60 + minutes * 1000 * 60 + seconds * 1000)
    }

    function handleHoursChange(e: ChangeEvent<HTMLInputElement>) {    
        setHours(+e.target.value)
        handleChange(+e.target.value, minutes, seconds)
    }

    function handleMinutesChange(e: ChangeEvent<HTMLInputElement>) {
        const value = +e.target.value < 60 ? +e.target.value : 59
        setMinutes(value)
        handleChange(hours, value, seconds)
    }

    function handleSecondsChange(e: ChangeEvent<HTMLInputElement>) {
        const value = +e.target.value < 60 ? +e.target.value : 59
        console.log(value);
        
        setSeconds(value)
        handleChange(hours, minutes, value)
    }

    return (
        <section>
            <input 
                type="number"
                value={hours}
                onChange={handleHoursChange}
            />

            :

            <input 
                type="number"
                value={minutes}
                onChange={handleMinutesChange}
            />

            :

            <input 
                type="number"
                value={seconds}
                onChange={handleSecondsChange}
            />
        </section>
    )
}