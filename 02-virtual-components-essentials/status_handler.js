function handle_status_changes(eventData) {
    console.log(JSON.stringify(eventData));
}

Shelly.addStatusHandler(handle_status_changes);