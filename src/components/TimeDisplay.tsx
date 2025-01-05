import { formatValue } from "../utils/utils"
import { ClockState } from "./Clock"


export default function TimeDisplay(
    props: {
        state: ClockState
    }
) {
    return (
        <h1>{formatValue(props.state.displayedValue)}</h1>
    )
}