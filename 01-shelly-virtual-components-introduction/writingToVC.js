const VC_TEMP_ID = 200;
const VC_TEMP_NAME = "number:200";

let new_value = 10;

Shelly.call("Number.Set", {id: VC_TEMP_ID, value: new_value}, function(result) {
  console.log("Result:", result);
  // if we need to make sure the value is changed and do some other actions we have to
  // do it in the callback of the Number.Set
  let temp = Shelly.getComponentStatus(VC_TEMP_NAME).value;
  console.log("Temperature after callback to Number.Set", temp);
});

// at this point in time the value won't be changed yet
let temp = Shelly.getComponentStatus(VC_TEMP_NAME).value;
console.log("Temperature immediately after calling Number.Set", temp);