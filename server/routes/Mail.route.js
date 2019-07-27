const nodemailer = require('nodemailer');
//const keys = require('../config/keys');
const HTMLGenerator = require('./HTMLGenerator');
const mailer = require('../utils/Mailer');

console.log(HTMLGenerator);

module.exports = app => {

    app.post('/sendmail', (req, res) => {

        HTMLGenerator({ template: 'email_template', params: { name: "Дима", content: "test", _id: "123" } }).then((html) => {
               const { subscribe, email, message, name } = req.body;

                if (subscribe) mailer.subscribe(email, name);

                let mailOptions = {
                    from: 'dmitry_malugin@hotmail.com', // sender address
                    to: 'dmitry_malugin@hotmail.com', // list of receivers
                    subject: `Fishing mail`, // Subject line
                    // text: message, // plain text body
                    html: html
                    // attachments: attachments
                };

                mailer.sendMailOverHotmail(mailOptions, error => {
                    console.error(mailOptions, error);
                    res.status(500).send('Error while sending mail: ' + error);
                }, info => {
                    console.info(mailOptions, info);
                    res.status(200).send(`Message sent: %s ${info}`);
                });
        }, (error) =>{
            console.log('error');
        })

      
    });


};