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
  const resultsRef = useRef([]);
  // const responseGinenRef = useRef(false);
  const [splash, setShowSplash] = useState(false);

  const [props, set] = useSprings(cards.length, i => ({
    ...to(i),
    from: from(i),
  }));

  const [styleProps, setStyleProps] = useSpring(() => {
    return {
      backgroundColor: '#2C95FF',
    };
  });

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

      if (!down && trigger) {
        resultsRef.current.push(dir === 1);
        const i = resultsRef.current.length - 1;

        setShowSplash(
          resultsRef.current[i] === cards[i].correct ? 'correct' : 'wrong'
        );
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
    <animated.div className="swiper-wrapper" style={styleProps}>
      {props.map(({ x, y, rot, scale }, i) => {
        const { caseText, imageSrc, resultText, resultDescr } = cards[i];

        return (
          <div key={i}>
            {splash && (
              <div className={`splash splash__${splash}`}>
                <div className="splash__card">
                  <div className="splash__result">
                    <img src={`/${splash}.png`} alt="" />
                    <p>{splash === 'wrong' ? 'Неверно!' : 'Верно!'}</p>
                  </div>
                  <h3>{resultText}</h3>
                  <p>{resultDescr}</p>
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
    </animated.div>
  );
}

export default Swiper;
