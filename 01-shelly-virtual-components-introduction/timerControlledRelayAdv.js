const VC_TIME_ID = 202;
const VC_TIME_NAME = "number:" + VC_TIME_ID;

console.log("Turning on switch");
Shelly.call("Switch.Set", {id:0, on:true});
let timer_handle = Timer.set(1000, true, function() {
  let cur_time = Shelly.getComponentStatus(VC_TIME_NAME).value;
  // decrease the time with 1
  cur_time--;
  // we update only when the new value is 0 or greater
  Shelly.call("Number.Set", {id: VC_TIME_ID, value: cur_time});
  // check for end of time
  if (cur_time <= 0) {
    // turn off the switch
    Shelly.call("Switch.Set", {id:0, on:false});
    // remove the timer
    Timer.clear(timer_handle);
  }
});