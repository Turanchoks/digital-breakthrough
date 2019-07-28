import React, { useState, useRef } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import axios from 'axios';
import { useSprings, animated, interpolate } from 'react-spring/hooks';
import { useGesture } from 'react-with-gesture';
import './Swiper.css';
import { useGlobalState } from './GlobalState';

const cards = [
  {
    caseText:
      'Вы хотите скачать песню Beatles «Yesterday» и нашли следующий вариант в Интернете. Надежен ли он?',
    imageSrc: '/cards-beatles.png',
    resultText:
      'Скачивание подобного файла с расширением скринсейвера приведет к установке на устройство вредоносной программы.',
    resultDescr: 'Не скачивайте подозрительные файлы на подозрительных сайтах',
    correct: false,
  },
  {
    caseText:
      'Петр использует двухфакторную аутентификацию через SMS. Можно ли считать такой способ надежным?',
    imageSrc: '/cards-2fa.png',
    resultText:
      'Считается, что аутентификация через СМС-сообщения не обеспечивает достаточного уровня безопасности.',
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
];

const to = i => ({
  x: 0,
  y: i * -10,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100,
});
const from = i => ({ rot: 0, scale: 1.5, y: -1000 });

const trans = (r, s) => `rotate(${r / 2}deg)`;

function Swiper({ history }) {
  const { user, setUser } = useGlobalState();

  const resultsRef = useRef({});
  const [splash, setShowSplash] = useState({ show: false, index: null });

  const [props, set] = useSprings(cards.length, i => ({
    ...to(i),
    from: from(i),
  }));

  const bind = useGesture(
    ({
      args: [index],
      down,
      delta: [xDelta],
      distance,
      direction: [xDir],
      velocity,
    }) => {
      const trigger = velocity > 0.2;

      const dir = xDir < 0 ? -1 : 1;

      if (!down && trigger && xDir !== 0) {
        resultsRef.current[index] = dir === 1;
        if (resultsRef.current[index] === cards[index].correct) {
          axios.post(`/api/update/${user.userId}`);
          setUser(user => {
            return {
              ...user,
              userPoints: +user.userPoints + 1,
            };
          });
        }
        setTimeout(() => {
          setShowSplash({
            show:
              resultsRef.current[index] === cards[index].correct
                ? 'correct'
                : 'wrong',
            index,
          });
        }, 200);
      }

      set(i => {
        if (index !== i) return;
        const isGone = resultsRef.current[index] != null;

        const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0;

        const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0);

        const scale = down ? 1.1 : 1;
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
        };
      });
    }
  );

  React.useLayoutEffect(() => {
    // all cards are gone, go to next task
    if (
      cards.length === Object.keys(resultsRef.current).length &&
      !splash.show
    ) {
      history.push('/messenger-splash');
    }
  });

  if (!user) {
    return <Redirect to="/" />;
  }

  return (
    <animated.div
      className="swiper-wrapper"
      style={{
        backgroundColor: '#2C95FF',
      }}
    >
      {props.map(({ x, y, rot, scale }, i) => {
        const { caseText, imageSrc, resultText, resultDescr } = cards[i];

        return (
          <div key={i}>
            {splash.show && splash.index === i && (
              <div className={`splash splash__${splash.show}`}>
                <div className="splash__card">
                  <div className="splash__result">
                    <img src={`/${splash.show}.png`} alt="" />
                    <p>{splash.show === 'wrong' ? 'Неверно!' : 'Верно!'}</p>
                  </div>
                  <h3>{resultText}</h3>
                  <p>{resultDescr}</p>
                  <button
                    className="splash__next"
                    onClick={() => setShowSplash({ index: null, show: false })}
                  >
                    Далее
                  </button>
                </div>
              </div>
            )}
            <animated.div
              className="card__wrapper-wrapper"
              style={{
                transform: interpolate(
                  [x, y],
                  (x, y) => `translate3d(${x}px,${y}px,0)`
                ),
              }}
            >
              <animated.div
                className="card__wrapper"
                {...bind(i)}
                style={{
                  transform: interpolate([rot, scale], trans),
                }}
              >
                <div className="card">
                  <h2>{caseText}</h2>
                  <img src={imageSrc} width="100%" alt="" />
                </div>
              </animated.div>
            </animated.div>
          </div>
        );
      })}
      <div className="swiper__left">
        <img src="/swipe-left.png" alt="" />
        <span>Скорее опасно</span>
      </div>
      <div className="swiper__right">
        <img src="/swipe-right.png" alt="" />
        <span>Скорее надежно</span>
      </div>
    </animated.div>
  );
}

export default withRouter(Swiper);
