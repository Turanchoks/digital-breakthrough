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
              caseText: 'Вы собираетесь купить ЖД билеты, вас перевели на страницу оплаты',
              imageSrc: '/cards-railway-tickets.png',
              resultText: 'Обращайте внимание  на ссылку в адресной строке.',
              resultDescr: 'Все данные должны передаваться по защищенному протоколу HTTPS',
              correct: true,
            },
        ]}/>
      </>
    );
  }
}
