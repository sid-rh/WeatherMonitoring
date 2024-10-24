const nodemailer = require('nodemailer');
const dotenv=require('dotenv');
dotenv.config();

const TEMPERATURE_THRESHOLD = 35;
const CONSECUTIVE_ALERTS = 2;

const sendAlertEmail=async(city, temperature)=> {
    
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        auth: {
          user: process.env.SENDER_MAIL_ID, 
          pass: process.env.APP_PASSWORD 
        }
      });
      console.log("info");
      let info;
      try {
        info = await transporter.sendMail({
            from: '"Weather Alert System" <alerts@example.com>',
            to: process.env.RECEIVER_MAIL_ID,
            subject: `High Temperature Alert for ${city}`,
            text: `The temperature in ${city} has exceeded ${TEMPERATURE_THRESHOLD}°C for ${CONSECUTIVE_ALERTS} consecutive readings. Current temperature: ${temperature.toFixed(2)}°C`
          },(err,res)=>{
            if(err) throw err;
            // console.log(res);
          });
      } catch (error) {
        console.log(error);
      }
    
    // console.log("Alert email sent: %s", info.messageId);
  }

module.exports=sendAlertEmail;