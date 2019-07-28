import React, { useState } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import NotFound from './pages/not-found';
import { RegistrationForm } from './RegistrationForm';
import Splash from './Splash';
import Results from './Results';
import 'semantic-ui-css/semantic.min.css';
import Swiper from './Swiper';
import Phishing from './Phishing';
import Home from './Home';
import Messenger from './Messenger';
import { GlobalStateProvider } from './GlobalState';

const splashProps = {
  swiper: {
    icon: '/swipe-right.png',
    title: 'Карточки',
    descr:
      'Свайпайте карточку вправо, если считаете предложенный вариант надежным, и влево, если по-вашему он представляет опасность.',
    url: '/swiper',
    buttonText: 'Начать',
  },
  // messenger: {
  //   icon: '/messenger.png',
  //   title: 'Сообщения',
  //   descr: 'Отвечайте на входящие сообщения, выбрав соответствующий вариант.',
  //   url: '/messenger',
  //   buttonText: 'Начать',
  // },
  mail: {
    icon: '/email.png',
    title: 'Почта',
    descr:
      'Проверьте вашу почту на предмет новых писем. Пройдите по ссылкам, которые кажутся вам надежными.',
    url: '/results',
    buttonText: 'К результатам',
  },
};

function App() {
  const [user, setUser] = useState(() => {
    const user = window.localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }

    return null;
  });

  React.useEffect(() => {
    window.localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const value = React.useMemo(() => {
    return {
      user,
      setUser,
    };
  }, [user, setUser]);

  return (
    <GlobalStateProvider value={value}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/register" render={() => <RegistrationForm />} />

          <Route
            exact
            path="/swiper-splash"
            render={() => <Splash {...splashProps.swiper} />}
          />
          <Route exact path="/swiper" render={() => <Swiper />} />

          {/* <Route exact path="/messenger" render={() => <Messenger />} />

          <Route
            exact
            path="/messenger-splash"
            render={() => <Splash {...splashProps.messenger} />}
          />
          <Route exact path="/messenger" render={() => null} /> */}

          <Route
            exact
            path="/phishing-splash"
            render={() => <Splash {...splashProps.mail} />}
          />
          <Route exact path="/phishing" render={() => <Phishing />} />

          <Route exact path="/results" render={() => <Results />} />

          <Route render={() => <NotFound />} />
        </Switch>
      </BrowserRouter>
    </GlobalStateProvider>
  );
}

export default App;
