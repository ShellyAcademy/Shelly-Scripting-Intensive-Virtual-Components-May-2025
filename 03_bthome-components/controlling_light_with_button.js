const BT_BUTTON_NAME = "bthomedevice:203";

Shelly.addEventHandler(function (ev) {
    if (typeof ev.component != "undefined" && ev.component === BT_BUTTON_NAME) {
        let event = ev.info.event;
        if (event === "single_push") {
            console.log("Toggling the light!");
            Shelly.call("Light.Toggle", { id: 0 });
        } else if (event === "double_push") {
            console.log("Increasing brightness with 20%");
            // read the current brighness setting
            let brightness = Shelly.getComponentStatus("light:0").brightness;
            brightness += 20;
            if (brightness > 100) brightness = 100;
            Shelly.call("Light.Set", { id: 0, brightness: brightness });
        } else if (event === "triple_push") {
            console.log("Decreasing brightness with 20%");
            // read the current brighness setting
            let brightness = Shelly.getComponentStatus("light:0").brightness;
            brightness -= 20;
            if (brightness < 0) brightness = 0;
            Shelly.call("Light.Set", { id: 0, brightness: brightness });
        } else if (event === "long_push") {
            console.log("Setting brighness to max");
            // set the brightness to 100%
            Shelly.call("Light.Set", { id: 0, brightness: 100 });
        }
    }
})