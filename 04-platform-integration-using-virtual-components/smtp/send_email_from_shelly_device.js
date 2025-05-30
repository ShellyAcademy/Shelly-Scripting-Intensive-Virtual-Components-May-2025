const API_URL = "http://192.168.10.244:3001/send_email";

function send_email(from, to, subject, message) {
    let body = {
        "from": from,
        "to": to,
        "subject": subject,
        "text": message
    }
    Shelly.call("HTTP.POST", { url: API_URL, body: body });
}

send_email(
    "shelly@shelly.com",
    "shelly.softuni@gmail.com",
    "Email from the Shelly",
    "Hello from Dimmer Gen3", function (response) {
        console.log(response.body);
    });