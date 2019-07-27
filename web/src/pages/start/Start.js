import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Swiper from './../../Swiper';


export default class Start extends Component {

  render() {
    return (
      <>
        <Link to="/step">Старт</Link>
        <Swiper
          cards={[
            {
              name: 'Heather',
              age: 32,
              distance: '4 miles away',
              text:
                "My nickname is Gilette because I'm the best a man can get. Also I will cut you.",
              correct: true,
            },
        ]}/>
      </>
    );
  }
}
