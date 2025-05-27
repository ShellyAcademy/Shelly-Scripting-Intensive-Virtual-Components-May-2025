const VC_TEMP_NAME = "number:200";
const OTHER_TEMP_ID = 200;
const OTHER_DEVICE_BASE_URL = "http://192.168.10.176/rpc";

let url = OTHER_DEVICE_BASE_URL + "/Number.Set?id=" + OTHER_TEMP_ID + "&value=";

let old_value;
Timer.set(5 * 1000, true, function(){
  let value = Shelly.getComponentStatus(VC_TEMP_NAME).value;
  if (value !== old_value) {
    old_value = value;
    console.log("Value change to", value,". Updating other device.");
    // update the other device VC value using HTTP RPC call
    let update_url = url + value;
    Shelly.call("HTTP.GET", {url:update_url}, function(result, errorCode, errorMessage){
      // if an error occurs do some error handling by trying again until success
      if (errorCode < 0) {
        console.log("Error detected. Retrying the update on next timer tick");
        // looks like device is offline we cannot update. set the old_value to undefined to make sure we try again later
        old_value = undefined;
      }
    });   
  }
});