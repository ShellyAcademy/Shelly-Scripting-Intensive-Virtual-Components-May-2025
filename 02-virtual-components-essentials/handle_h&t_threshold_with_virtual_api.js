const CONFIG = {
    VC_HT_TEMPERATURE_NAME: "number:201",
    VC_HT_HUMIDITY_NAME: "number:202",
};

let ht_temperature = Virtual.getHandle(CONFIG.VC_HT_TEMPERATURE_NAME);
let ht_humidity = Virtual.getHandle(CONFIG.VC_HT_HUMIDITY_NAME);

ht_temperature.on("change", function (ev) {
    let temperature = ev.value;
    if (temperature > 30) {
        console.log("Very hot");
    } else if (temperature > 18) {
        console.log("Very nice temperature");
    } else {
        console.log("It's quite chilly");
    }
});

ht_humidity.on("change", function (ev) {
    let humidity = ev.value;
    if (humidity > 70) {
        console.log("Too humid");
    } else if (humidity > 40) {
        console.log("Good humidity");
    } else {
        console.log("Too dry");
    }
});