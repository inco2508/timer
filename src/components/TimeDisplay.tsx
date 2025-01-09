import { formatValue } from "../utils/utils"
import { ClockState } from "./Clock"


export default function TimeDisplay(
    props: {
        state: ClockState
    }
) {
    return (
        <section>
            <p>{formatValue(props.state.displayedValue)}</p>
        </section>
    )
}