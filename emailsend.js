const nodemailer = require('nodemailer');
module.exports={
    SendEmail:(to,subject,body)=>{
        console.log(process.env.EMAIL);
        console.log(process.env.PASSEMAIL);
        let mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user:process.env.EMAIL,
                pass:process.env.PASSEMAIL
            }
        });
         
        let mailDetails = {
            from: process.env.EMAIL,
            to,
            subject,
            html: body
        };
         
        mailTransporter.sendMail(mailDetails, function(err, data) {
            if(err) {
                console.log(err.message);
            } else {
                console.log('Email sent successfully');
            }
        });
    }

}