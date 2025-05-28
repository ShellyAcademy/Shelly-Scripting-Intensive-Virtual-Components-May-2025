const CONFIG = {
    VC_TEMPERATURE_NAME: "number:200",
    VC_WARM_BTN_NAME: "button:200",
    VC_MODERATE_BTN_NAME: "button:201",
    VC_COLD_BTN_NAME: "button:202"
};

let vc_temperature = Virtual.getHandle(CONFIG.VC_TEMPERATURE_NAME);
let vc_warm_btn = Virtual.getHandle(CONFIG.VC_WARM_BTN_NAME);
let vc_moderate_btn = Virtual.getHandle(CONFIG.VC_MODERATE_BTN_NAME);
let vc_cold_btn = Virtual.getHandle(CONFIG.VC_COLD_BTN_NAME);

vc_warm_btn.on("single_push", function () {
    vc_temperature.setValue(27);
});

vc_moderate_btn.on("single_push", function () {
    vc_temperature.setValue(20);
});

vc_cold_btn.on("single_push", function () {
    vc_temperature.setValue(17);
});

vc_temperature.on("change", function (ev) {
    let temperature = ev.value;
    console.log("The new temperature is", temperature);
    let url = "http://192.168.10.200/rpc/Number.set?id=202&value=" + temperature;
    Shelly.call("HTTP.GET", { url: url });
});

//If we have ShellyWall display with 3 virtual buttons we can attach actions/webhooks to them
// that will invoke the follwing urls:
// warm - http://<ip_address_of_device/rpc/Button.Trigger?id=200&event=single_push
// moderate - http://<ip_address_of_device/rpc/Button.Trigger?id=201&event=single_push
  // cold - http://<ip_address_of_device/rpc/Button.Trigger?id=202&event=single_push