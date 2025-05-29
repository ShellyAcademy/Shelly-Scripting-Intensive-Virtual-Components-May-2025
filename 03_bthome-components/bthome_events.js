const CONFIG = {
    BT_DOOR_NAME: "bthomesensor:202",
    BT_ILLUMINANCE_NAME: "bthomesensor:201",
    BT_ROTATION_NAME: "bthomesensor:203",
    BT_HT_BUTTON_NAME: "bthomedevice:201"
}

Shelly.addEventHandler(function (ev) {
    if (typeof ev.component != "undefined" && ev.component === CONFIG.BT_HT_BUTTON_NAME) {
        console.log("HT button pressed:", ev.info.event)
    }
});

Shelly.addStatusHandler(function (ev) {
    if (typeof ev.component != "undefine") {
        if (ev.component === CONFIG.BT_DOOR_NAME && typeof ev.delta.value != "undefined") {
            console.log("Door open:", ev.delta.value);
        }
        if (ev.component === CONFIG.BT_ILLUMINANCE_NAME && typeof ev.delta.value != "undefined") {
            console.log("Illuminance is", ev.delta.value);
        }
        if (ev.component === CONFIG.BT_ROTATION_NAME && typeof ev.delta.value != "undefined") {
            console.log("Rotation is", ev.delta.value);
        }
    }
});