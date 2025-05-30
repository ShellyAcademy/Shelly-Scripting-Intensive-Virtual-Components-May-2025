const VC_BUTTON_ID = 201;
const INPUT_NAME = "input:1";

Shelly.addEventHandler(function (ev) {
    if (typeof ev.component != "undefined" && ev.component === INPUT_NAME) {
        Shelly.call("Button.Trigger", { id: VC_BUTTON_ID, event: ev.info.event });
    }
});