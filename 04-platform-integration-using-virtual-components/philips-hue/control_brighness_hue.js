const CONFIG = {
    HUE_BRIDGE_IP: "192.168.10.179",
    HUE_KEY: "YVwtvIWT27uGSnJp-OUz51v3sBmsO4IHLxQxY4yJ",
    HUE_LIGHTS: [5, 6, 7],
    DIMMER_LIGHTS: [0],
    VC_BRIGHTNESS_NAME: "number:200",
    VC_DIM_UP_NAME: "button:201",
    VC_DIM_DOWN_NAME: "button:202"
}

let vc_brightness = Virtual.getHandle(CONFIG.VC_BRIGHTNESS_NAME);
let base_url = "http://" + CONFIG.HUE_BRIDGE_IP + "/api/" + CONFIG.HUE_KEY + "/lights/"
function set_light_state(light, state) {
    let url = base_url + light + "/state"
    Shelly.call("HTTP.Request", {
        url: url,
        method: "PUT",
        body: JSON.stringify(state)
    },
        function (response) {
            if (response.code === 200) {
                console.log("Light", light, "state changed!");
            } else {
                console.log("Error during changing light", light, "state");
            }
        });
}

vc_brightness.on("change", function (ev) {
    let brightness = ev.value;
    let hue_brightness = Math.round(brightness * (254 / 100));
    console.log("Setting dimmer brightness to", brightness, " and hue brightness to", hue_brightness);
    for (light of CONFIG.HUE_LIGHTS) {
        set_light_state(light, { "bri": hue_brightness });
    }
    for (id of CONFIG.DIMMER_LIGHTS) {
        Shelly.call("Light.Set", { id: id, brightness: brightness });
    }
});

let vc_dim_up = Virtual.getHandle(CONFIG.VC_DIM_UP_NAME);
let vc_dim_down = Virtual.getHandle(CONFIG.VC_DIM_DOWN_NAME);

// on single push of dim_up vc, increase brightnes with 20
vc_dim_up.on("single_push", function (ev) {
    let brightness = vc_brightness.getValue() + 20;
    if (brightness > 100) brightness = 100;
    vc_brightness.setValue(brightness);
});

// on single push of dim_down vc, decrease brightnes with 20
vc_dim_down.on("single_push", function (ev) {
    let brightness = vc_brightness.getValue() - 20;
    if (brightness < 0) brightness = 0;
    vc_brightness.setValue(brightness);
});

// long push on dim up set it to max
vc_dim_up.on("long_push", function (ev) {
    vc_brightness.setValue(100);
});

// long push on dim down set it to 0
vc_dim_down.on("long_push", function (ev) {
    vc_brightness.setValue(0);
});