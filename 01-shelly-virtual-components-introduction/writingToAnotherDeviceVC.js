const VC_OTHER_DEVICE_TEMP_ID = 200;
const OTHER_DEVICE_BASE_URL = "http://192.168.10.176/rpc";

let new_value = 20;

// to set other device VC value we need to use HTTP request through rpc
// Number.Set works only on local VCs
let url = OTHER_DEVICE_BASE_URL + "/Number.Set?id=" + VC_OTHER_DEVICE_TEMP_ID + "&value=" + new_value;
console.log("URL is", url);
Shelly.call("HTTP.GET", {url: url}, function(result, errorCode, errorMessage) {
  console.log("Result:", result);
  // errorCode will contain -104 when request timed out
  // for other error codes look at: https://shelly-api-docs.shelly.cloud/gen2/ComponentsAndServices/HTTP
  console.log("errorCode:", errorCode);
  console.log("errorMessage:", errorMessage);
});