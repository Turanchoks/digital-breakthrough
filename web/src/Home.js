import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'react-lottie';
import animationData from './fp4488.json';
import { useSpring, animated } from 'react-spring/hooks';
import './Home.css';

const Home = () => {
  const [props, set] = useSpring(() => ({ width: '70%', height: '70%' }));
  const [showButton, setShowButton] = useState(false);

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      set({
        width: '50%',
        height: '50%',
      });
      setShowButton(true);
    }, 2900);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="Home">
      <animated.div className="Home__lottie" style={props}>
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: animationData,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice',
            },
          }}
          eventListeners={[
            {
              eventName: 'complete',
              callback: () => console.log('the animation completed:'),
            },
          ]}
        />
      </animated.div>
      {showButton && (
        <Link className="Home__button" to="/register">
          Погнали
        </Link>
      )}
    </div>
  );
};

export default Home;
