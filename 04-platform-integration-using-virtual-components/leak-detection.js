const CONFIG = {
    // the hall-efect will send ~4.5 pulses in a second per 1 liter per minute flow
    CALIBRATION_FACTOR: 4.5,
    WATER_FLOW_THRESHOLD: 3,
    LEAK_DETECTED_TIME_PERIOD: 20,
    TIMER_PERIOD: 2,
    PULSE_COMPONENT: "input:2",
    VALVE_CLOSE_URL: "http://192.168.10.187/rpc/Button.Trigger?id=200&event=single_push"
}

let leak_detection_time = 0;

function check_water_flow() {
    let new_pulse_count = Shelly.getComponentStatus(CONFIG.PULSE_COMPONENT).counts.total;
    let pulses_for_period = new_pulse_count - pulse_count;
    pulse_count = new_pulse_count;

    // calculate the water flow per second in liters per minute
    let avg_water_flow_for_period = pulses_for_period / CONFIG.TIMER_PERIOD / CONFIG.CALIBRATION_FACTOR;
    console.log("Current water flow:", avg_water_flow_for_period);
    if (avg_water_flow_for_period > 0 && avg_water_flow_for_period < CONFIG.WATER_FLOW_THRESHOLD) {
        console.log("Leak detected.");
        leak_detection_time += CONFIG.TIMER_PERIOD;
        console.log("Time with leak:", leak_detection_time);
        if (leak_detection_time > CONFIG.LEAK_DETECTED_TIME_PERIOD) {
            console.log("Leak detected for over", CONFIG.LEAK_DETECTED_TIME_PERIOD, "s, turning off valve");
            // we surpassed the time period with a leak and we need to turn off the valve
            // and inform owner
            // closing valve
            Shelly.call("HTTP.GET", { url: CONFIG.VALVE_CLOSE_URL });
            // send notification to owner
        }
    } else {
        leak_detection_time = 0;
    }
}

let pulse_count = Shelly.getComponentStatus(CONFIG.PULSE_COMPONENT).counts.total;
Timer.set(CONFIG.TIMER_PERIOD * 1000, true, check_water_flow);