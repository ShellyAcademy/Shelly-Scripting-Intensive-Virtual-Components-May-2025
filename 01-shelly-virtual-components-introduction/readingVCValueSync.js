const VC_TEMP_NAME = "number:200";

let temperature = Shelly.getComponentStatus(VC_TEMP_NAME).value;
console.log("Temperature is", temperature);