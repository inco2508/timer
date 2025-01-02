import { ClockState } from "../App";
import { formatValue } from "../utils/utils";

export default function TimeDisplay(
    props: {
        state: ClockState
    }
) {
    return (
        <h1>{formatValue(props.state.displayedValue)}</h1>
    )
}