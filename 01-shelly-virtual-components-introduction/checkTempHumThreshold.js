const VC_TEMP_NAME = "number:201";
const VC_HUMIDITY_NAME = "number:202";

Timer.set(5 * 1000, true, function(){
  let temperature = Shelly.getComponentStatus(VC_TEMP_NAME).value;
  let humidity = Shelly.getComponentStatus(VC_HUMIDITY_NAME).value;
  
  if (temperature > 30) {
    console.log("Too hot");
  } else if (temperature > 18) {
    console.log("Pretty good temperature");
  } else {
    console.log("Too cold");
  }
  
  if (humidity > 70) {
    console.log("Too humid");
  } else if (humidity > 40) {
    console.log("Very comfortable humidity");
  } else {
    console.log("Too dry");
  }
});