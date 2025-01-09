export function formatValue(value: number): string {
    let isNegative = false
    if (value < 0) {
        isNegative = true
        value *= -1
    }

    const hoursMs = value
    const hoursS = Math.floor(hoursMs / (1000 * 60 * 60))    

    const minutesMs = hoursMs - (hoursS * 1000 * 60 * 60)         
    const minutesS = Math.floor(minutesMs / (1000 * 60))

    const secondsMs = (minutesMs - (minutesS * 1000 * 60)) 
    const secondsS = Math.floor(secondsMs / (1000))

    return `${isNegative ? "-" : ""}${hoursS >= 10 ? hoursS : "0" + hoursS}:${minutesS >= 10 ? minutesS : "0" + minutesS }:${secondsS >= 10 ? secondsS : "0" + secondsS}`
}

export function stringToNumberValue(value: string): number {
    let numbers = value.split(":").map(value => +value)

    if (numbers.length === 3) {
        
        return numbers.reduce((previousValue, currentValue, index) => 
            previousValue + currentValue * (1000 * Math.pow(60, 2 - index))
        , 0)
    }

    return 0
}

export function numberToStringValue(value: number): string {
    const hoursMs = value
    const hoursS = Math.floor(hoursMs / (1000 * 60 * 60))

    const minutesMs = hoursMs - (hoursS * 1000 * 60 * 60)         
    const minutesS = Math.floor(minutesMs / (1000 * 60))

    const secondsMs = (minutesMs - (minutesS * 1000 * 60)) 
    const secondsS = Math.floor(secondsMs / (1000))

    return `${hoursS >= 10 ? hoursS : "0" + hoursS}:${minutesS >= 10 ? minutesS : "0" + minutesS }:${secondsS >= 10 ? secondsS : "0" + secondsS}`
}

export function numberToHMS(value: number): { isNegative: boolean, hours: number, minutes: number, seconds: number } {
    let isNegative = false
    if (value < 0) {
        isNegative = true
        value *= -1
    }

    const hoursMs = value
    const hoursS = Math.floor(hoursMs / (1000 * 60 * 60))

    const minutesMs = hoursMs - (hoursS * 1000 * 60 * 60)         
    const minutesS = Math.floor(minutesMs / (1000 * 60))

    const secondsMs = (minutesMs - (minutesS * 1000 * 60)) 
    const secondsS = Math.floor(secondsMs / (1000))

    return {
        isNegative: isNegative,
        hours: hoursS,
        minutes: minutesS,
        seconds: secondsS
    }
}