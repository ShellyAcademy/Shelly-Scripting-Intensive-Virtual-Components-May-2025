const express = require("express");
const mailer = require("nodemailer");

const app = express();
app.use(express.json());

const port = 3001;

app.listen(port, function() {
    console.log("Server start on port", port)
});

app.get("/status", function(request, response) {
    let resp = { "status": "running"};
    response.send(resp);
});

// this function will send email through gmail smtp servers
// it needs user and password to authenticate
// user is your gmail mail
// password can be generated from Google account / Security / 2 step verification / App passwords
function sendEmail(from, to, subject, text) {
  let smtpProtocol = mailer.createTransport(
    {
        service: "Gmail",
        host: "smtp.gmail.com",
        auth: {
            user: "academyshelly@gmail.com",
            pass: "---- ---- ---- ----"
        }
    }
  );
  let emailOptions = {
    from: from,
    to: to,
    subject: subject,
    html: text
  };
  smtpProtocol.sendMail(emailOptions, function(err, response){
    if(err) {
        console.log(err);
    } 
    console.log('Message Sent', response);
    smtpProtocol.close();
  });
}

// api endpoint to send emails
app.post("/send_email", function(request, response) {
  console.log("Sending email: ", request.body);
  let body = request.body;
  let from = body.from;
  let to = body.to;
  let text = body.text;
  let subject = body.subject;

  sendEmail(from, to, subject, text);
  let resp = { "sent": true };
  response.send(resp);
});

