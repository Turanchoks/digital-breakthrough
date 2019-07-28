import React from 'react';
import { Redirect } from 'react-router-dom';
import sha1 from 'js-sha1';
import { useAxiosRequest } from 'use-axios-request';
import './Results.css';
import { useGlobalState } from './GlobalState';

const me = {
  email: 'aaaa@gmail.com',
  name: 'Никола Абрамов',
  score: 65,
};

function Results() {
  const { isFetching, data } = useAxiosRequest('/api/users');
  const { user } = useGlobalState();
  if (!user) {
    return <Redirect to="/" />;
  }
  const { userName, userEmail, userPoints } = user;

  if (isFetching) return null;
  return (
    <div className="results">
      <h2>Таблица лидеров</h2>
      <div className="results__inner">
        <div className="results__my">
          <img
            src={`https://robohash.org/${sha1(
              userName,
              userEmail
            )}.png?bgset=bg1`}
            alt={userName}
          />
          <span className="results__user-name results__my-name">
            {userName}
          </span>
          <span className="results__user-score results__my-score">
            {userPoints}
          </span>
        </div>
        <div className="results__table">
          {data.map((user, i) => {
            return (
              <div className="results__user">
                <div className="results__user-info">
                  <span className="results__user-place">{i + 1}</span>
                  <img
                    src={`https://robohash.org/${sha1(
                      user.name,
                      user.email
                    )}.png?bgset=bg1`}
                    alt={user.name}
                  />
                  <span className="results__user-name">{user.name}</span>
                </div>
                <span className="results__user-score ">{user.points}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Results;
