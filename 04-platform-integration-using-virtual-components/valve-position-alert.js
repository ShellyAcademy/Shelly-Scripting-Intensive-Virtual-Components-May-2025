const VC_VALVE_POSITION_NAME = "number:200";
const VC_VALVE_OPEN_NAME = "button:200";
const VC_VALVE_CLOSE_NAME = "button:201"

let vc_valve_position = Virtual.getHandle(VC_VALVE_POSITION_NAME);
let vc_valve_open = Virtual.getHandle(VC_VALVE_OPEN_NAME);
let vc_valve_close = Virtual.getHandle(VC_VALVE_CLOSE_NAME);

vc_valve_position.on("change", function (ev) {
    if (ev.value > 90) {
        console.log("Valve is over 90% open");
    }
});

let valve_base_url = "http://192.168.10.129/rpc/Button.Trigger?event=single_push&id="
vc_valve_open.on("single_push", function () {
    let url = valve_base_url + 201
    Shelly.call("HTTP.GET", { url: url });
});
vc_valve_close.on("single_push", function () {
    let url = valve_base_url + 200
    Shelly.call("HTTP.GET", { url: url });
});