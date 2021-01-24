BUTTONS_ID = [Button.A, Button.B]
NO_PRESS = 0
SHORT_PRESS = 1
LONG_PRESS = 2
buttons = [0, 0]
buttons_event = [NO_PRESS, NO_PRESS]
lastPress = -1

def areAllButtonsReleased():
    # release 
    for i in range(2):
        if buttons[i] > 0:
            return False
    return True

def emitEvents():
    q = buttons_event[0]
    if q == SHORT_PRESS:
        print("short a")
    if q == LONG_PRESS:
        print("long a")
    q = buttons_event[1]
    if q == SHORT_PRESS:
        print("short b")
    if q == LONG_PRESS:
        print("long b")

def keyb():
    global lastPress
    millis = control.millis()
    for j in range(2):
        buttons_event[j] = NO_PRESS
        # currently released but was pressed
        if input.button_is_pressed(BUTTONS_ID[j]):
            if buttons[j] == 0:
                buttons[j] = millis
            lastPress = -1
        elif buttons[j] > 0:
            time_diff = millis - buttons[j]
            if time_diff > 200:
                buttons_event[j] = LONG_PRESS if time_diff > 1000 else SHORT_PRESS
                buttons[j] = 0
                lastPress = 0
    emitEvents()
    if lastPress == 0 and areAllButtonsReleased():
        lastPress = millis
    if lastPress > 0 and millis - lastPress > 3000:
        print("idle")
        lastPress = -1
        
while True:
    keyb()