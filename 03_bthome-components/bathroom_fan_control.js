const CONFIG = {
    BT_HUMIDITY_NAME: "bthomesensor:",
    BT_HT_DEVICE_NAME: "bthomedevice:200"
}

Shelly.addEventHandler(function (ev) {
    if (typeof ev.component != "undefined" && ev.component === CONFIG.BT_HT_DEVICE_NAME) {
        console.log("Button pressed, toggling the fan power");
        Shelly.call("Switch.Toggle", { id: 0 });
    }
});

Shelly.addStatusHandler(function (ev) {
    if (ev.component === CONFIG.BT_HUMIDITY_NAME && typeof ev.delta.value != "undefined") {
        let humidity = ev.delta.value;
        if (humidity > 70) {
            // turn on the fan
            console.log("Too humid, turning on the fan");
            Shelly.call("Switch.Set", { id: 0, on: true });
        } else {
            // turn off the fan
            console.log("Normal humidy, turning off the fan");
            Shelly.call("Switch.Set", { id: 0, on: false });
        }
    }
});