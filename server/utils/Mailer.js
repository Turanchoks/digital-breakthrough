const nodemailer = require('nodemailer');
const keys = require('../config/keys');


class Mailer {
    

    sendMailOverHotmail(mailOptions, errorCb, successCb) {
       
        const transport = nodemailer.createTransport({
            service: "Hotmail",
            auth: {
                user: "Dmitry_Malugin@hotmail.com",
                login: "Dmitry_Malugin@hotmail.com",
                LOGIN: "Dmitry_Malugin@hotmail.com",
                pass: keys.hotmailpassword,
                password: keys.hotmailpassword
            }
        });

        transport.sendMail(mailOptions, (error, info) => {
            console.log(mailOptions, error, info);
             // verify connection configuration
            transport.verify(function (error, success) {
                if (error) {
                    console.error(error);
                } else {
                    console.error('Server is ready to take our messages ', success);
                }
            });

            if (error) {
                console.error('Error while sending mail: ' + error);
                errorCb(error);
            } else {
                console.error('Message sent: %s', info);
            }
            transport.close();
            successCb(info);
        });

    }


}

module.exports = new Mailer();