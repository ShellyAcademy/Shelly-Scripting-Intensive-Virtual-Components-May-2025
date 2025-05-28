const CONFIG = {
    VC_MESSAGE_ID: 201,
    VC_MESSAGE_CONFIG_ID: 202,
    VC_SEND_EMAIL_ID: 200
}

let message = "Hi from a script";
let message_cfg = {
    from: "script@shelly.com",
    to: "shelly.softuni@gmail.com",
    subject: "I'm a script"
}

Shelly.call("Text.Set", { id: CONFIG.VC_MESSAGE_ID, value: message }, function () {
    Shelly.call("Text.Set", { id: CONFIG.VC_MESSAGE_CONFIG_ID, value: JSON.stringify(message_cfg) },
        function () {
            Shelly.call("Button.Trigger", { id: CONFIG.VC_SEND_EMAIL_ID, event: "single_push" });
        });
});