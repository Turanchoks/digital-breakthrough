import React, { useState, useEffect, useRef } from 'react';
import { useSprings, animated, interpolate, useSpring } from 'react-spring';
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

const trans = (r, s) =>
  `perspective(1500px) rotateX(30deg) rotateY(${r /
    10}deg) rotateZ(${r}deg) scale(${s})`;

function Swiper({ cards }) {
  // const [results, setResults] = useState();
  const resultsRef = useRef([]);
  // const responseGinenRef = useRef(false);

  const [responseGiven, setResponseGiven] = useState(false);

  const [props, set] = useSprings(cards.length, i => ({
    ...to(i),
    from: from(i),
  }));

  const [styleProps, setStyleProps] = useSpring(() => {
    return {
      backgroundColor: 'blue',
    };
  });

  useEffect(() => {
    if (responseGiven) {
      const timeoutId = setTimeout(() => {
        setResponseGiven(false);
        setStyleProps({
          backgroundColor: 'blue',
        });
      }, 1000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [responseGiven]);

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
        setResponseGiven(true);
        const i = resultsRef.current.length - 1;

        setStyleProps({
          backgroundColor:
            resultsRef.current[i] === cards[i].correct ? 'green' : 'red',
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
    <animated.div className="swiper-wrapper" style={styleProps}>
      {props.map(({ x, y, rot, scale }, i) => {
        const { name, age, distance, text, pics } = cards[i];

        return (
          <animated.div
            key={i}
            style={{
              transform: interpolate(
                [x, y],
                (x, y) => `translate3d(${x}px,${y}px,0)`
              ),
            }}
          >
            <animated.div
              {...bind(i)}
              style={{
                transform: interpolate([rot, scale], trans),
              }}
            >
              <div className="card">
                <h2>{name},</h2>
                <h2>{age}</h2>
                <h5>{distance}</h5>
                <h5>{text}</h5>
              </div>
            </animated.div>
          </animated.div>
        );
      })}
    </animated.div>
  );
}

export default Swiper;
