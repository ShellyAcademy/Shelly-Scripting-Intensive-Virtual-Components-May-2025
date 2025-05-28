const CONFIG = {
    VC_WEATHER_DATA_NAME: "text:200",
    WEATHER_API_URL1: "https://api.open-meteo.com/v1/forecast?latitude=42.15&longitude=24.75&current=temperature_2m,relative_humidity_2m",
    WEATHER_API_URL2: "https://api.open-meteo.com/v1/forecast?latitude=42.15&longitude=24.75&current=wind_speed_10m"
}

let vc_weather_data = Virtual.getHandle(CONFIG.VC_WEATHER_DATA_NAME);
let weather_data = {}

Timer.set(5000, true, function () {
    Shelly.call("HTTP.GET", { url: CONFIG.WEATHER_API_URL1 }, function (response, errorCode, errorMessage) {
        if (response.code !== 200) {
            console.log("There was an error");
            return;
        }
        let body = JSON.parse(response.body);
        let temperature = body.current.temperature_2m;
        let humidity = body.current["relative_humidity_2m"];
        weather_data.temperature = temperature;
        weather_data.humidity = humidity;
        Shelly.call("HTTP.GET", { url: CONFIG.WEATHER_API_URL2 }, function (response, errorCode, errorMessage) {
            let body = JSON.parse(response.body);
            let wind_speed = body.current.wind_speed_10m;
            weather_data.wind_speed = wind_speed;

            // finally update the weather data in the text VC
            let weather_data_json = JSON.stringify(weather_data);
            vc_weather_data.setValue(weather_data_json);
        });
    })
});

vc_weather_data.on("change", function (ev) {
    let weather_data = JSON.parse(ev.value);
    console.log("Weather data:", ev.value)
    if (weather_data.wind_speed > 5) {
        console.log("Too windy");
    }
});