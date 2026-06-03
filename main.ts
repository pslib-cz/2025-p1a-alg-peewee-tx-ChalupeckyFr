//**ovladac**
radio.setGroup(23)
radio.setTransmitSerialNumber(true)

basic.forever(function(){
    let pressedA = input.buttonIsPressed(Button.A)
    let pressedB = input.buttonIsPressed(Button.B)
    let pressedLogo = input.logoIsPressed()
    if (pressedA && pressedB) {
        radio.sendString("goForward")
    } 
   else if(pressedLogo){
       radio.sendString("goBack")
   }
    else if (pressedA) {
        radio.sendString("turnLeft")
    } else if (pressedB) {
        radio.sendString("turnRight")
    } else {
        radio.sendString("stop")
    }    
})
