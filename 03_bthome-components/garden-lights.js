const CONFIG = {
    BT_MOTION_NAME: "bthomesensor:208",
    BT_ILLUMINANCE_NAME: "bthomesensor:209",
}

function calculate_brightness(luminance) {
    if (luminance <= 100) {
        return 100 - 0.2 * luminance;
    } else if (luminance <= 500) {
        return 80 - 20 * Math.pow((luminance - 100) / 400, 1.5);
    } else if (luminance <= 1000) {
        return 60 - 60 * Math.pow((luminance - 500) / 500, 2);
    } else {
        return 0;
    }
}

Shelly.addStatusHandler(function (ev) {
    if (ev.component === CONFIG.BT_MOTION_NAME && typeof ev.delta.value != "undefined") {
        // check for motion detection
        if (ev.delta.value) {
            let illuminance = Shelly.getComponentStatus(CONFIG.BT_ILLUMINANCE_NAME).value;
            let brightness = calculate_brightness(illuminance);
            console.log("Motion detected, turning on lights. Setting the brightness to", brightness);
            Shelly.call("Light.Set", { id: 0, on: true, brightness: brightness });
        } else {
            console.log("No more motion, turning off lights");
            Shelly.call("Light.Set", { id: 0, on: false });
        }
    }
});