import { ChangeEvent, useState } from "react"
import { numberToHMS } from "../utils/utils"
import { ClockState } from "../App"

export default function TimePicker(
    props: {
        state: ClockState,
        setPickedValue: (value: number) => void,
        setDisplayedValue: (value: number) => void
    }
) {
    const hms = numberToHMS(props.state.pickedValue)
    const [hours, setHours] = useState(hms.hours)
    const [minutes, setMinutes] = useState(hms.minutes)
    const [seconds, setSeconds] = useState(hms.seconds)

    function handleChange(hours: number, minutes: number, seconds: number) {    
        props.setPickedValue(hours * 1000 * 60 * 60 + minutes * 1000 * 60 + seconds * 1000)    
        props.setDisplayedValue(hours * 1000 * 60 * 60 + minutes * 1000 * 60 + seconds * 1000)
    }

    function handleHoursChange(e: ChangeEvent<HTMLInputElement>) {    
        setHours(+e.target.value)
        handleChange(+e.target.value, minutes, seconds)
    }

    function handleMinutesChange(e: ChangeEvent<HTMLInputElement>) {
        setMinutes(+e.target.value)
        handleChange(hours, +e.target.value, seconds)
    }

    function handleSecondsChange(e: ChangeEvent<HTMLInputElement>) {
        setSeconds(+e.target.value)
        handleChange(hours, minutes, +e.target.value)
    }

    return (
        <section>
            <input 
                type="number"
                value={hours}
                onChange={handleHoursChange}
            />

            <input 
                type="number"
                value={minutes}
                onChange={handleMinutesChange}
            />

            <input 
                type="number"
                value={seconds}
                onChange={handleSecondsChange}
            />
        </section>
    )
}