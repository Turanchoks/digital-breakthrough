import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Swiper from './../../Swiper';

export default class Start extends Component {
  render() {
    return (
      <>
        {/* <Link to="/step">Старт</Link> */}
        <Swiper
          cards={[
            {
              caseText:
                'Вы хотите скачать песню Beatles «Yesterday» и нашли следующий вариант в Интернете. Надежен ли он?',
              imageSrc: '/cards-beatles.png',
              resultText: 'Скачивание подобного файла с расширением скринсейвера приведет к установке на устройство вредоносной программы.',
              resultDescr:
                'Не скачивайте подозрительные файлы на подозрительных сайтах',
              correct: false,
            },
            {
              caseText:
                'Петр использует двухфакторную аутентификацию через SMS. Можно ли считать такой способ надежным?',
              imageSrc: '/cards-2fa.png',
              resultText: 'Считается, что аутентификация через СМС-сообщения не обеспечивает достаточного уровня безопасности.',
              resultDescr:
                'Рекомендуется использовать специальные приложения, например, Google Authenticator',
              correct: false,
            },
            {
              caseText:
                'Вы собираетесь купить ЖД билеты, вас перевели на страницу оплаты. Надежный ли сайт?',
              imageSrc: '/cards-railway-tickets.png',
              resultText: 'Обращайте внимание  на ссылку в адресной строке.',
              resultDescr:
                'Все данные должны передаваться по защищенному протоколу HTTPS',
              correct: false,
            },
            {
              caseText:
                'Василий придумал сложный пароль из 12 знаков, первую половину запомнил, а вторую – записал в заметки телефона. Надежен ли этот способ?',
              imageSrc: '/cards-password.png',
              resultText: 'Данный способ хранения пароля вполне надежен.',
              resultDescr:
                'Это не позволит получить доступ к вашим данным в случае утери телефона.',
              correct: true,
            },
          ]}
        />
      </>
    );
  }
}
