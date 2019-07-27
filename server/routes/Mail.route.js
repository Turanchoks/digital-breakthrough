const nodemailer = require('nodemailer');
//const keys = require('../config/keys');
const HTMLGenerator = require('./HTMLGenerator');
const mailer = require('../utils/Mailer');



module.exports = app => {

    app.post('/sendmail', (req, res) => {

        HTMLGenerator({ template: 'tinkoff_template', params: { name: "Дима", url: "http://localhost:9000/wrongclick" } }).then((html) => {
               const { email, name } = req.body;


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
                    res.status(200).send(`Message sent: %s ${JSON.stringify(info)}`);
                });
        }, (error) =>{
            console.log('error', JSON.stringify(error));
        })

      
    });

    app.get('/rightclick', (req, res) => {
        res.status(200).send(`
            <html>
                <h1>Вы все сделали правильно! Ссылка безопасна!</h1>
            </html>
        `);
       
      
    });

    app.get('/wrongclick', (req, res) => {
        res.status(200).send(`
                <html>
                    <h1>Вы только что перешли по вредоносной ссылке!</h1>
                </html>
            
        `);
        
        
    });


};