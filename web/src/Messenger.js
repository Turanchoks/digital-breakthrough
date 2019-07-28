import React, { useState, useEffect } from 'react';
import { Chat } from '@progress/kendo-react-conversational-ui';
import { Redirect } from 'react-router-dom';
import sha1 from 'js-sha1';
import './Messenger.css';
import { useGlobalState } from './GlobalState';
import Splash from './Splash';

const correctResults = [['Отправить логин']];

const dialogs = [
  [
    {
      author: {
        id: 123,
      },
      text:
        'Здравствуйте, уважаемый клиент!\nВы оставили сообщение в нашей группе. Мы обязательно поможем Вам и предоставим всю необходимую информацию.\nДля начала нам надо идентифицировать Вас как клиента. Отправьте, пожалуйста, Ваш логин (идентификатор) в системе СбербанкОнлайн. В целях безопасности пароль не сообщайте, только логин.',
      suggestedActions: [
        {
          type: 'reply',
          value: 'Отправить логин',
        },
        {
          type: 'reply',
          value: 'Обратиться к администратору группы',
        },
        {
          type: 'reply',
          value: 'Позвонить в банк',
        },
        {
          type: 'reply',
          value: 'Пожаловаться на группу',
        },
      ],
      timestamp: new Date(),
    },
  ],
];

const Messenger = () => {
  const { user } = useGlobalState();
  const [state, setState] = useState({ result: null, index: 0 });
  if (!user) {
    return <Redirect to="/" />;
  }

  if (state.result != null) {
    const title = state.result ? 'Верно' : 'Неверно';
    const icon = state.result ? '/correct.png' : '/wrong.png';
    const descr = state.result
      ? 'Вы все правильно делаете'
      : 'У вас все украли';
    return (
      <Splash
        title={title}
        buttonText="Продолжить"
        descr={descr}
        icon={icon}
        url="#"
        onClick={() => {
          setState(state => {
            return {
              ...state,
              result: null,
            };
          });
        }}
      />
    );
  }

  if (state.index >= dialogs.length) {
    return <Redirect to="/phishing-splash" />;
  }

  return (
    <div>
      <Chat
        user={{
          id: 1,
          avatarUrl: `https://robohash.org/${sha1(
            user.userName,
            user.userEmail
          )}.png?bgset=bg1`,
        }}
        messages={dialogs[state.index]}
        onMessageSend={e => {
          const { text } = e.message;
          setState({
            ...state,
            result: text === correctResults[state.index][0],
            index: state.index + 1,
          });
        }}
      />
    </div>
  );
};

export default Messenger;
