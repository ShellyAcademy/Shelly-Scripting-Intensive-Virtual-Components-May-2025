const CONFIG = {
    HUE_BRIDGE_IP: "192.168.10.179",
    HUE_KEY: "YVwtvIWT27uGSnJp-OUz51v3sBmsO4IHLxQxY4yJ",
    VC_LIGHT_SWITCH_NAME: "boolean:200"
}

let vc_light_switch = Virtual.getHandle(CONFIG.VC_LIGHT_SWITCH_NAME);

let base_url = "http://" + CONFIG.HUE_BRIDGE_IP + "/api/" + CONFIG.HUE_KEY + "/lights/"
function get_light_state_and_set_vc(light) {
    let url = base_url + light
    Shelly.call("HTTP.Request", {
        url: url,
        method: "GET"
    },
        function (response) {
            if (response.code === 200) {
                let body = JSON.parse(response.body);
                let state = body.state;
                vc_light_switch.setValue(state.on);
            } else {
                console.log("There was an error reading light", light, "information");
            }
        });
}

Timer.set(10 * 1000, true, function () {
    get_light_state_and_set_vc(5);
});