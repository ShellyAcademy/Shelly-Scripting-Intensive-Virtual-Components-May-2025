Shelly.addEventHandler(function (ev) {
    if (ev.component === "input:0" && ev.info.event === "single_push") {
        console.log("Cover up button pushed");

    }
});