import nodemailer from 'nodemailer';
import config from '../config';
//https://nodemailer.com/
export const sendEmail=async(to:string,html:string)=>{

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com.",
        port: 587,
        secure: config.NODE_ENV==='production',
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: "amsohelrana.me@gmail.com",
          pass: "mrfk dbqm otzm yida",
        },
      });


      await transporter.sendMail({
        from: 'amsohelrana.me@gmail.com', // sender address
        to, // list of receivers
        subject: "Change the Password", // Subject line
        text: "Reset your password with in 10 mins", // plain text body
        html, // html body
      });


    
}