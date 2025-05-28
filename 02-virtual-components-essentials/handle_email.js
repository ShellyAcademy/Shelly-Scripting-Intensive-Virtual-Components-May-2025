const CONFIG = {
    VC_MESSAGE_NAME: "text:201",
    VC_MESSAGE_CONFIG_NAME: "text:202",
    VC_SEND_EMAIL_NAME: "button:200"
}

let vc_message = Virtual.getHandle(CONFIG.VC_MESSAGE_NAME);
let vc_message_config = Virtual.getHandle(CONFIG.VC_MESSAGE_CONFIG_NAME);
let vc_send_email = Virtual.getHandle(CONFIG.VC_SEND_EMAIL_NAME);

// read the brevo api key from KVS
let api_key = "";
Shelly.call("KVS.GET", { key: "brevo-api-key" }, function (result) {
    api_key = result.value;
});

function sendEmail(from, to, subject, message) {
    let url = "https://api.brevo.com/v3/smtp/email";
    let headers = {
        "api-key": api_key,
    }
    let data = {
        sender: {
            name: from,
            email: from
        },
        to: [
            {
                name: to,
                email: to
            }
        ],
        subject: subject,
        htmlContent: message
    }
    Shelly.call("HTTP.Request",
        {
            method: "POST",
            url: url,
            headers: headers,
            body: data
        },
        function (response, errorCode, errorMessage) {
            if (errorCode === 0) {
                console.log("Email sent successfully. Response:", JSON.stringify(response))
            } else {
                console.log("There was a problem sending the email:", errorMessage)
            }
        });
}

vc_send_email.on("single_push", function (ev) {
    let msg_config = JSON.parse(vc_message_config.getValue());
    let message = vc_message.getValue();
    sendEmail(msg_config.from, msg_config.to, msg_config.subject, message);
});