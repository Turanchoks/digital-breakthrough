import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Start from './pages/start';
import NotFound from './pages/not-found';
// import s from './App.css';
import { RegistrationForm } from "./RegistrationForm";
import Splash from "./Splash";
import Results from "./Results";
import 'semantic-ui-css/semantic.min.css'


const splashProps = {
  swiper: {
    icon: '/swipe-right.png',
    title: 'Карточки',
    descr: 'Свайпайте карточку вправо, если считаете предложенный вариант надежным, и влево, если по-вашему он представляет опасность.',
    url: '/swiper',
    buttonText: 'Начать',
  },
  messenger: {
    icon: '/messenger.png',
    title: 'Сообщения',
    descr: 'Отвечайте на входящие сообщения, выбрав соответствующий вариант.',
    url: '/messenger',
    buttonText: 'Начать',
  },
  mail: {
    icon: '/email.png',
    title: 'Почта',
    descr: 'Проверьте вашу почту на предмет новых писем. Пройдите по ссылкам, которые кажутся вам надежными.',
    url: '/results',
    buttonText: 'К результатам',
  },
};

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div className={s.content}> */}
            <Switch>
              <Route exact path="/" component={() => <RegistrationForm />} />
              <Route exact path="/swiper-splash" component={() => <Splash {...splashProps.swiper} />} />
              <Route exact path="/swiper" component={() => <Start />} />
              <Route exact path="/messenger-splash" component={() => <Splash {...splashProps.messenger} />} />
              <Route exact path="/email-splash" component={() => <Splash {...splashProps.mail} />} />
              <Route exact path="/results" component={() => <Results />} />
              <Route component={NotFound} />
            </Switch>
          {/* </div>
        </header> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
