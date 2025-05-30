const CONFIG = {
    //WEATHER_URL: "https://api.open-meteo.com/v1/forecast?latitude=42.15&longitude=24.75&current=precipitation",
    WEATHER_URL: "http://192.168.10.244:3000/v1/forecast?latitude=42.15&longitude=24.75&current=precipitation",
    VALVE_SET_URL: "http://192.168.10.187/rpc/Number.Set?id=200&value=",
    TIMER_PERIOD: 2 // in seconds - e.g. 10 * 60s
}

const PRECIPITATION_MAP = [
    { from: 0, to: 0.1, position: 100, name: "No precipitation (Maximum flow)" },
    { from: 0.1, to: 10, position: 60, name: "Light precipitation (Standard flow)" },
    { from: 10, to: 20, position: 20, name: "Moderate precipitation (Low flow)" },
    { from: 20, to: 10000, position: 0, name: "High precipitation (No flow)" },
];

function get_precipitation_data(precipitation) {
    for (d of PRECIPITATION_MAP) {
        if (precipitation >= d.from && precipitation < d.to) {
            return d;
        }
    }
}

let current_position = -1;

function check_precipitation() {
    Shelly.call("HTTP.GET", { url: CONFIG.WEATHER_URL }, function (response, errorCode) {
        if (errorCode < 0 || response.code !== 200) {
            console.log("Error reading weather information");
            return;
        }
        let body = JSON.parse(response.body);
        let current_precipitation = body.current.precipitation;
        console.log("Current precipitation:", current_precipitation);
        let precipitation_data = get_precipitation_data(current_precipitation);
        if (current_position != precipitation_data.position) {
            current_position = precipitation_data.position;
            console.log("Changing valve settigs to:", precipitation_data.name);
            console.log("Changing valve position to:", precipitation_data.position);
            let url = CONFIG.VALVE_SET_URL + precipitation_data.position;
            Shelly.call("HTTP.GET", { url: url });
        }
    });
}

Timer.set(CONFIG.TIMER_PERIOD * 1000, true, check_precipitation);