import React from 'react';
import { Link } from 'react-router-dom';

import { Button } from 'semantic-ui-react';

import './Splash.css';

function Splash({ title, url, buttonText, descr, icon, onClick }) {
  return (
    <div className="middle-splash">
      <div className="middle-splash__inner">
        <img className="middle-splash__icon" src={icon} alt="" />
        <h1 className="middle-splash__title">{title}</h1>
        <p className="middle-splash__description">{descr}</p>
        <Link className="middle-splash__button" to={url} onClick={onClick}>
          {buttonText}
        </Link>
      </div>
    </div>
  );
}

export default Splash;
