import config from "../config";
const accountSid = config.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require("twilio")(accountSid, authToken);

export const sms = (msg) => {
  client.messages
    .create({
      body: msg,
      from: "+18025232970",
      to: "+541144275105",
    })
    .then((message) => console.log(message.sid))
    .catch(console.log);
};
