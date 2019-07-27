import React from 'react';
import logo from './logo.svg';
import './App.css';
import Swiper from './Swiper';

function App() {
  return (
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
      ]}
    />
  );
}

export default App;
