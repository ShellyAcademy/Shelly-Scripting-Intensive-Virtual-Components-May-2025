const VC_TEMP_ID = 200;

Shelly.call("Number.GetStatus", {id:VC_TEMP_ID}, function(result) {
  console.log("Temperature is", result.value);
});

console.log("After getting status");