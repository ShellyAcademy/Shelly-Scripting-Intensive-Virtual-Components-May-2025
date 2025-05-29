const VC_NUMBER_NAME = "number:200";
const VC_BOOLEAN_NAME = "boolean:200";
const VC_BUTTON_NAME = "button:200";

let vc_number = Virtual.getHandle(VC_NUMBER_NAME);
vc_number.on("change", function (ev) {
    console.log("New value:", ev.value);
});

let vc_boolean = Virtual.getHandle(VC_BOOLEAN_NAME);
vc_boolean.on("change", function (ev) {
    console.log("Switch value:", ev.value);
});

let vc_button = Virtual.getHandle(VC_BUTTON_NAME);
vc_button.on("single_push", function (ev) {
    console.log("Single push");
});

vc_button.on("double_push", function (ev) {
    console.log("Double push");
});

vc_button.on("triple_push", function (ev) {
    console.log("Triple push");
});

vc_button.on("long_push", function (ev) {
    console.log("Long push");
});