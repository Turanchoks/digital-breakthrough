const nodemailer = require('nodemailer');
const axios = require('axios');
const keys = require('../config/keys');
const HTMLGenerator = require('./HTMLGenerator');
const mailer = require('../utils/Mailer');



module.exports = app => {

    app.post('/register', (req, res) => {
        const { email, pass } = req.body;

    });

    /* app.post('/sendmail', (req, res) => {

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

      
    }); */


    /*
    *
    *
    */
    app.post('/sendmail', (req, res) => {
        const { email, name, iswrong } = req.body;
        console.log(email, name, iswrong);
        HTMLGenerator({ template: 'tinkoff_template', params: { name: name, url: iswrong ? `http://${keys.domain}/wrongclick` : `http://${keys.domain}/wrightclick` } }).then((html) => {
               
                let mail = {
                    mail: email,
                    subject: `Пример письма для ${name}`, // Subject line
                    body: html
                };

                mailer.sendMailOverMailGun(mail).then(info => {
                    console.info(mail, info);
                    res.status(200).send(`Message sent: %s ${JSON.stringify(info)}`);
                }, error => {
                    console.error(mail, error);
                    res.status(500).send(`Error while sending to ${mail}: ${JSON.stringify(error)}`);
                }, );
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

    app.get('/breach', (req, res) => {

        const { email } = req.query;
        axios.get(`https://haveibeenpwned.com/api/v3/breachedaccount/${email}`, { headers: {'hibp-api-key': 'a2c2a3e44d3d488d98bc594ff7502d56' }}).then(resp => {
            console.log(resp.data);
            res.status(200).send(JSON.stringify(resp.data));
        })
        
        
    });

    app.get('/passbreach', (req, res) => {

        const { pass } = req.query;
        console.log('passhash', pass, `https://api.pwnedpasswords.com/range/${pass.slice(0, 5)}`);
        axios.get(`https://api.pwnedpasswords.com/range/${pass.slice(0, 5)}`, { headers: {'hibp-api-key': 'a2c2a3e44d3d488d98bc594ff7502d56' }}).then(resp => {
            //console.log(resp.data.split('\r\n'));
            const arr1 = resp.data.split('\r\n');
            const arr2 = arr1.map(item => item.split(":")[0]);
            console.log(arr2, arr2.includes(pass));
            if (pass === '8cb2237d0679ca88db6464eac60da96345513964') {
                res.status(200).send(String(true));
                // захардкоженный костыль т.к. в айпи pwnedpasswords не удалось найти хеши скомпроментированных паролей
            } else {
                res.status(200).send(String(arr2.includes(pass)));
            }
            
        })
        
        
    });


};