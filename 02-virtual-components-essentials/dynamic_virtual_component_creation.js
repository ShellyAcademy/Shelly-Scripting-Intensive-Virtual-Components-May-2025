let config = {
    name: "My number",
    default_value: 50,
    min: -100,
    max: 100
}

Shelly.call("Virtual.add", {
    id: 256, // id is optional. if not provided next available id will be used
    type: "number",
    config: config
}, function (response, errorCode, errorMessage) {
    console.log(errorCode, errorMessage);
    if (response != undefined) {
        console.log("The ID of the new component is", response.id);
    }
});