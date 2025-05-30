const CONFIG = {
    VC_SPEAK_TEXT_NAME: "text:200",
    VC_SPEAK_NAME: "button:203",
    HA_IP: "192.168.10.245:8123",
    HA_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJiM2ZiMWI3ZDkyZmM0NTRkODllZTEzNzMxNGFlZTIyZiIsImlhdCI6MTc0ODYzMDExNywiZXhwIjoyMDYzOTkwMTE3fQ.UV2kw9toIw0GsnrXiXMm6bh2jHWSgFr6AH324UySVKY"
}

function speak(message, player_id) {
    let url = "http://" + CONFIG.HA_IP + "/api/services/tts/speak";
    let headers = {
        "Authorization": "Bearer " + CONFIG.HA_KEY
    }
    let body = {
        "entity_id": "tts.google_translate_en_com",
        "media_player_entity_id": player_id,
        "message": message
    }
    Shelly.call("HTTP.Request", {
        method: "POST",
        url: url,
        headers: headers,
        body: body
    }, function (response) {
        if (response.code === 200) {
            console.log("Message sent successfully");
        } else {
            console.log("There was an error sending the message");
        }
    })
}

let vc_speak_text = Virtual.getHandle(CONFIG.VC_SPEAK_TEXT_NAME);
let vc_speak = Virtual.getHandle(CONFIG.VC_SPEAK_NAME);

vc_speak.on("single_push", function (ev) {
    let text = vc_speak_text.getValue();
    speak(text, "media_player.living_room_speaker");
    //speak(text, "media_player.bedroom_speaker");
});