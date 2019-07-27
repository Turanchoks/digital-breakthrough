import React, { useState, useRef } from 'react';
import {
  useSprings,
  animated,
  interpolate,
  useSpring,
} from 'react-spring/hooks';
import { useGesture } from 'react-with-gesture';
import './Swiper.css';

const to = i => ({
  x: 0,
  y: i * -10,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100,
});
const from = i => ({ rot: 0, scale: 1.5, y: -1000 });

const trans = (r, s) => `rotate(${r / 2}deg)`;

function Swiper({ cards }) {
  // const [results, setResults] = useState();
  const resultsRef = useRef({});
  // const responseGinenRef = useRef(false);
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
        setShowSplash({
          show: resultsRef.current[index] === cards[index].correct
            ? 'correct'
            : 'wrong',
          index,
        });
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

export default Swiper;
