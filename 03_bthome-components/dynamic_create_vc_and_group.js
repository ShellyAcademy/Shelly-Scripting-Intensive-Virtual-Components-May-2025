let config = {
    name: "My number",
    default_value: 50,
    min: -100,
    max: 100,
    meta: {
        ui: {
            view: "Slider",
            unit: "C",
            step: "5"
        }
    }
}

Shelly.call("Virtual.add", {
    type: "number",
    config: config
}, function (response, errorCode, errorMessage) {
    console.log(errorCode, errorMessage);
    if (response != undefined) {
        let vc_id = response.id;
        // Let's create a new group with name Test Group
        Shelly.call("Virtual.Add", {
            type: "group",
            config: {
                name: "Test Group"
            }
        }, function (response) {
            // the new group id
            let group_id = response.id;
            // set the value of the group to a list of components (only one for now)
            Shelly.call("Group.Set", { id: group_id, value: ["number:" + vc_id] });
        });
    }
});