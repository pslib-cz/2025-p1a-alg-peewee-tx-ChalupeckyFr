let pressedLogo = false
let pressedB = false
let pressedA = false
let shaked = false


// **Ovladač**
radio.setGroup(23)
radio.setTransmitSerialNumber(true)
basic.forever(function () {
    pressedA = input.buttonIsPressed(Button.A)
    pressedB = input.buttonIsPressed(Button.B)
    pressedLogo = input.logoIsPressed()
    shaked = input.isGesture(Gesture.Shake)
    if (pressedA && pressedB) {
        radio.sendString("goForward")
    } else if (pressedLogo) {
        radio.sendString("goBack")
    } else if (pressedA) {
        radio.sendString("turnLeft")
    } else if (pressedB) {
        radio.sendString("turnRight")
    } else if (shaked) {
        radio.sendString("shaked")
    } else {
        radio.sendString("stop")
    }
})
