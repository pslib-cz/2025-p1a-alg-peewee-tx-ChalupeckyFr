radio.setGroup(23)
radio.setTransmitSerialNumber(true)
input.onButtonPressed(Button.A, function () {
    basic.showNumber(control.deviceSerialNumber())
})

while (true) {
    let pressedA = input.buttonIsPressed(Button.A)
    let pressedB = input.buttonIsPressed(Button.B)
    if (pressedA && pressedB) {

        radio.sendString("goForward")
    }
    else if (pressedB) {
        radio.sendString("turnRight")
    }
    else if (pressedA ) {
        radio.sendString("turnLeft")
    }
    else {
        radio.sendString("stop")
    }
    basic.pause(50)
}
