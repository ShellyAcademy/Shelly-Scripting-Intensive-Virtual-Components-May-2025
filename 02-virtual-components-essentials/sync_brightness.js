const CONFIG = {
    VC_BRIGHTNESS_NAME: "number:200",
    DEVICE_URLS: [
        "http://192.168.10.147/rpc/Light.Set?id=0&brightness=",
        "http://192.168.10.161/rpc/RGB.Set?id=0&brightness=",
        "http://192.168.10.182/light/0?brightness="
    ]
}

let vc_brightness = Virtual.getHandle(CONFIG.VC_BRIGHTNESS_NAME);

vc_brightness.on("change", function (ev) {
    let brightness = ev.value;
    for (let device_url of CONFIG.DEVICE_URLS) {
        let url = device_url + brightness;
        console.log("Executing", url);
        Shelly.call("HTTP.GET", { url: url });
    }
});