def show(key):
    print("python:" + str(key))
Eniac.on_keyboard(show)

def interval():
    pass
control.set_interval(interval, 100, control.IntervalMode.INTERVAL)
