const CONFIG = {
    BT_DOOR_NAME: "bthomesensor:202",
    BT_ILLUMINANCE_NAME: "bthomesensor:201",
    BT_ROTATION_NAME: "bthomesensor:203",
    BT_HT_TEMPERATURE_NAME: "bthomesensor:206"
}

console.log("Door open:", Shelly.getComponentStatus(CONFIG.BT_DOOR_NAME).value);
console.log("Illuminance is", Shelly.getComponentStatus(CONFIG.BT_ILLUMINANCE_NAME).value);
console.log("Rotation is", Shelly.getComponentStatus(CONFIG.BT_ROTATION_NAME).value);

console.log("Temperature is", Shelly.getComponentStatus(CONFIG.BT_HT_TEMPERATURE_NAME).value);