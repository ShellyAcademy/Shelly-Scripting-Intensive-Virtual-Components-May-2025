const CONFIG = {
    HUE_BRIDGE_IP: "192.168.10.179",
    HUE_KEY: "YVwtvIWT27uGSnJp-OUz51v3sBmsO4IHLxQxY4yJ",
    HUE_LIGHTS: ["5", "6", "7"],
    VC_LIGHTS_CONTROL_NAME: "button:200",
    VC_LIGHTS_SWITCH_NAME: "boolean:200"
}

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

// control the lights though virtual button with events (single_push - on, double_push - off)
let vc_lights_control = Virtual.getHandle(CONFIG.VC_LIGHTS_CONTROL_NAME);
vc_lights_control.on("single_push", function (ev) {
    for (let light of CONFIG.HUE_LIGHTS) {
        set_light_state(light, { on: true });
    }
});
vc_lights_control.on("double_push", function (ev) {
    for (let light of CONFIG.HUE_LIGHTS) {
        set_light_state(light, { on: false });
    }
});

// control the lights though virtual switch (boolean)
let vc_lights_switch = Virtual.getHandle(CONFIG.VC_LIGHTS_SWITCH_NAME);
vc_lights_switch.on("change", function (ev) {
    for (let light of CONFIG.HUE_LIGHTS) {
        set_light_state(light, { on: ev.value });
    }
});