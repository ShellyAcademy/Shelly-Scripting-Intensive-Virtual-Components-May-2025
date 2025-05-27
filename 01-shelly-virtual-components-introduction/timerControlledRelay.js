const VC_TIME_NAME = "number:202";

// read the time from the VC in seconds
let time = Shelly.getComponentStatus(VC_TIME_NAME).value;
// turn on the switch
Shelly.call("Switch.Set", {id:0, on:true});
console.log("Waiting", time, "seconds");
Timer.set(time * 1000, false, function() {
  console.log("Time elapsed, turning off the switch");
  // turn off the switch
  Shelly.call("Switch.Set", {id:0, on:false});
})