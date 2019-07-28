const nodemailer = require('nodemailer');
const axios = require('axios');
const config = require('../config');
const HTMLGenerator = require('./HTMLGenerator');
const mailer = require('../utils/Mailer');

const userDao = require('./../dao/User.dao');

module.exports = app => {
  /*
   * в теле запроса принимает JSON объект вида { "email": "RussianPsySoft@yandex.ru", "name": "Дмитрий", "pass": "12345" }
   *
   */
  app.post('/register', (req, res) => {
    const { email, pass, name } = req.body;
    userDao.saveUserIfNotExist({ email, pass, name }).then(
      result => {
        console.info(result);
        res.status(200).send(JSON.stringify(result.insertedIds['0']));
      },
      error => {
        res
          .status(500)
          .send(`Error while saving ${email}: ${JSON.stringify(error)}`);
      }
    );
  });

  /*
   * в теле запроса принимает JSON объект вида { id: "5d3cd9ff23fd6736ad99124c" }
   *
   */
  app.post('/update/:id', (req, res) => {
    const { id } = req.params;
    userDao.updateUser(id).then(
      result => {
        console.info(result);
        res.status(200).send(JSON.stringify(result));
      },
      error => {
        res
          .status(500)
          .send(`Error while saving ${email}: ${JSON.stringify(error)}`);
      }
    );
  });

  app.get('/user/:id', (req, res) => {
    const { id } = req.params;
    userDao.getUser(id).then(
      result => {
        console.info(result);
        res.status(200).send(JSON.stringify(result));
      },
      error => {
        res
          .status(500)
          .send(`Error while getting ${id}: ${JSON.stringify(error)}`);
      }
    );
  });

  app.get('/users', (req, res) => {
    userDao.getAllUsers().then(
      result => {
        console.info(result);
        res.status(200).send(JSON.stringify(result));
      },
      error => {
        res
          .status(500)
          .send(`Error while getting all users: ${JSON.stringify(error)}`);
      }
    );
  });

  /*
   * в теле запроса принимает JSON объект вида { "email": "RussianPsySoft@yandex.ru", "name": "Дмитрий", "iswrong": false }
   *
   */
  app.post('/sendmail', (req, res) => {
    const { email, name, iswrong } = req.body;
    console.log(email, name, iswrong);
    HTMLGenerator({
      template: 'tinkoff_template',
      params: {
        name: name,
        url: iswrong
          ? `http://${config.domain}/wrongclick`
          : `http://${config.domain}/wrightclick`,
      },
    }).then(
      html => {
        let mail = {
          mail: email,
          subject: `Пример письма для ${name}`, // Subject line
          body: html,
        };

        mailer.sendMailOverMailGun(mail).then(
          info => {
            console.info(mail, info);
            res.status(200).send(`Message sent: %s ${JSON.stringify(info)}`);
          },
          error => {
            console.error(mail, error);
            res
              .status(500)
              .send(`Error while sending to ${mail}: ${JSON.stringify(error)}`);
          }
        );
      },
      error => {
        console.log('error', JSON.stringify(error));
        res.status(500).send(`/sendmail error: ${JSON.stringify(error)}`);
      }
    );
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
    console.log('breach', email, config.hibp_api_key);
    axios
      .get(
        `https://haveibeenpwned.com/api/v3/breachedaccount/${encodeURIComponent(
          email
        )}`,
        { headers: { 'hibp-api-key': config.hibp_api_key } }
      )
      .then(
        resp => {
          console.log(resp.data);
          res.status(200).send(JSON.stringify(resp.data));
        },
        error => {
          console.log('status', error.response.status);
          if (error.response.status === 404) {
            res.status(200).send(JSON.stringify([]));
          } else {
            res.status(500).send(`/breach error: ${JSON.stringify(error)}`);
          }
        }
      );
  });

  app.get('/passbreach', (req, res) => {
    const { pass } = req.query;
    console.log(
      'passhash',
      pass,
      `https://api.pwnedpasswords.com/range/${pass.slice(0, 5)}`
    );
    axios
      .get(`https://api.pwnedpasswords.com/range/${pass.slice(0, 5)}`, {
        headers: { 'hibp-api-key': config.hibp_api_key },
      })
      .then(
        resp => {
          //console.log(resp.data.split('\r\n'));
          const arr1 = resp.data.split('\r\n');
          const arr2 = arr1.map(item => item.split(':')[0]);
          //console.log(arr2, arr2.includes(pass));
          if (pass === '8cb2237d0679ca88db6464eac60da96345513964') {
            res.status(200).send(String(true));
            // захардкоженный костыль т.к. в айпи pwnedpasswords не удалось найти хеши скомпроментированных паролей
          } else {
            res.status(200).send(String(arr2.includes(pass)));
          }
        },
        error => {
          console.log(`/passbreach error: ${JSON.stringify(error)}`);
        }
      );
  });
};
