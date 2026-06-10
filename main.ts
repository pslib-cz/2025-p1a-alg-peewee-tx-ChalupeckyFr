// *Kód pro ovladač*
// AI bylo použito na to aby mi nám poradilo jak fungují nějaké funkce (eg. Math.map, Rotation.Pitch/Roll),
// také bylo použito pro debugging a kontrolu logiky u některých částí kódu

radio.setGroup(23)
radio.setTransmitSerialNumber(true)

let weStarted: boolean = false
let recentGear = 2
let speedLimit = 60

function showDegree() {
    if (recentGear == 0) {
        basic.showString("R")
    } else {
        basic.showNumber(recentGear)
    }
}

input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    weStarted = !weStarted
    if (weStarted) {
        basic.showLeds(`
            . # . # .
            # . # . #
            . # . # .
            # . # . #
            . # . # .
            `)
        basic.pause(300)
        showDegree()
    } else {
        radio.sendString("X0Y0G2")
        basic.showIcon(IconNames.Asleep)
    }
})

input.onButtonPressed(Button.A, function () {
    if (!weStarted) {
        return
    }
    if (input.buttonIsPressed(Button.B)) {
        return
    }
    if (recentGear > 0) {
        recentGear -= 1
    }
    if (recentGear == 0) {
        speedLimit = 30
    }
    if (recentGear == 1) {
        speedLimit = 30
    }
    if (recentGear == 2) {
        speedLimit = 60
    }
    showDegree()
})

input.onButtonPressed(Button.B, function () {
    if (!weStarted) {
        return
    }
    if (input.buttonIsPressed(Button.A)) {
        return
    }
    if (recentGear < 3) {
        recentGear += 1
    }
    if (recentGear == 1) {
        speedLimit = 30
    }
    if (recentGear == 2) {
        speedLimit = 60
    }
    if (recentGear == 3) {
        speedLimit = 100
    }
    showDegree()
})

basic.showIcon(IconNames.Asleep)

basic.forever(function () {
    if (!weStarted) {
        return
    }

    let x = input.rotation(Rotation.Roll)
    if (Math.abs(x) < 15) {
        x = 0
    }

    let maxSignal = 90
    let ourX = Math.map(x, -maxSignal, maxSignal, -speedLimit, speedLimit)

    let ourY = 0
    if (input.buttonIsPressed(Button.A) && input.buttonIsPressed(Button.B)) {
        if (recentGear == 0) {
            ourY = -speedLimit
        } else {
            ourY = speedLimit
        }
    }

    let msg = "X" + Math.round(ourX) + "Y" + Math.round(ourY) + "G" + recentGear
    radio.sendString(msg)

    basic.pause(50)
})