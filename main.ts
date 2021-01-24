let BUTTONS_ID = [Button.A, Button.B]
let NO_PRESS = 0
let SHORT_PRESS = 1
let LONG_PRESS = 2
let buttons = [0, 0]
let buttons_event = [NO_PRESS, NO_PRESS]
let lastPress = -1
function areAllButtonsReleased(): boolean {
    //  release 
    for (let i = 0; i < 2; i++) {
        if (buttons[i] > 0) {
            return false
        }
        
    }
    return true
}

function emitEvents() {
    let q = buttons_event[0]
    if (q == SHORT_PRESS) {
        console.log("short a")
    }
    
    if (q == LONG_PRESS) {
        console.log("long a")
    }
    
    q = buttons_event[1]
    if (q == SHORT_PRESS) {
        console.log("short b")
    }
    
    if (q == LONG_PRESS) {
        console.log("long b")
    }
    
}

function keyb() {
    let time_diff: number;
    
    let millis = control.millis()
    for (let j = 0; j < 2; j++) {
        buttons_event[j] = NO_PRESS
        //  currently released but was pressed
        if (input.buttonIsPressed(BUTTONS_ID[j])) {
            if (buttons[j] == 0) {
                buttons[j] = millis
            }
            
            lastPress = -1
        } else if (buttons[j] > 0) {
            time_diff = millis - buttons[j]
            if (time_diff > 200) {
                buttons_event[j] = time_diff > 1000 ? LONG_PRESS : SHORT_PRESS
                buttons[j] = 0
                lastPress = 0
            }
            
        }
        
    }
    emitEvents()
    if (lastPress == 0 && areAllButtonsReleased()) {
        lastPress = millis
    }
    
    if (lastPress > 0 && millis - lastPress > 3000) {
        console.log("idle")
        lastPress = -1
    }
    
}

while (true) {
    keyb()
}
