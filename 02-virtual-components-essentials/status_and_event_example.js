const VC_TEMP_NAME = "number:200";
const VC_LIGHT_SWITCH_NAME = "button:200";

Shelly.addStatusHandler(function (eventData) {
    // making sure, that eventData.component exists (not undefined))
    if (typeof eventData.component != "undefined" && eventData.component === VC_TEMP_NAME) {
        let delta = eventData.delta;
        let temperature = delta.value;
        console.log("Status changed for", VC_TEMP_NAME, ", the new value is", temperature);
        // if temperature under 20, turn on the switch (for example turning on heater)
        if (temperature < 20) {
            Shelly.call("Switch.Set", { id: 0, on: true });
        } else {
            // otherwise if > 20, turn off the switch
            Shelly.call("Switch.Set", { id: 0, on: false });
        }
    }
});

let timerHandle;

Shelly.addEventHandler(function (eventData) {
    // eventData will contain component, name, id, info
    // info.event will give us the name of the event: e.g. single_push, double_push, etc...
    if (typeof eventData.component != "undefined" && eventData.component === VC_LIGHT_SWITCH_NAME) {
        console.log("New event for", VC_LIGHT_SWITCH_NAME, ". Event is", eventData.info.event);
        if (eventData.info.event === "single_push") {
            // take action on single_push
            Shelly.call("Switch.Toggle", { id: 0 });
        } else if (eventData.info.event === "double_push") {
            // on double push start a blinking
            if (timerHandle === undefined) {
                timerHandle = Timer.set(1000, true, function () {
                    Shelly.call("Switch.Toggle", { id: 0 });
                });
            }
        } else if (eventData.info.event === "long_push") {
            if (timerHandle !== undefined) {
                Timer.clear(timerHandle);
                timerHandle = undefined;
            }
            Shelly.call("Switch.Set", { id: 0, on: false });
        }
    }
});