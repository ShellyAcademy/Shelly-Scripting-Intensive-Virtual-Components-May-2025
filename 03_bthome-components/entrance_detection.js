const CONFIG = {
    BT_MOTION_NAME: "bthomesensor:208",
    BT_DOOR_NAME: "bthomesensor:202",
    BT_DOOR_ILLUMINANCE_NAME: "bthomesensor:203",
    BT_ROTATION_NAME: "bthomesensor:204",
    EXTERNAL_LIGHT_CONTROL_URL: "http://192.168.10.231/rpc/Switch.Set?id=0&on="
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
    // check for door open
    if (ev.component === CONFIG.BT_ROTATION_NAME) {
        let motion = Shelly.getComponentStatus(CONFIG.BT_MOTION_NAME).value;
        let rotation = ev.delta.value;
        if (rotation >= 45 && motion) {
            // entrance was detected
            let luminance = Shelly.getComponentStatus(CONFIG.BT_DOOR_ILLUMINANCE_NAME).value;
            let brightness = calculate_brightness(luminance);
            console.log("Entrance was detected, illuminance is", luminance, ". Turning on lights with brightness", brightness);
            Shelly.call("Light.Set", { id: 0, on: true, brightness: brightness });
        }
    }

    if (ev.component === CONFIG.BT_MOTION_NAME) {
        let motion = ev.delta.value;
        console.log("Motion detected, turning", motion ? "on" : "off", "exterior lights");
        let url = CONFIG.EXTERNAL_LIGHT_CONTROL_URL + moiton ? "on" : "off";
        Shelly.call("HTTP.GET", { url: url });
    }
});