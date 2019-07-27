import React from 'react';
import sha1 from "js-sha1";
import './Results.css';


const me = {
  email: 'aaaa@gmail.com',
  name: 'Никола Абрамов',
  score: 65,
}

const users = [
  {
    email: 'test@gmail.com',
    name: 'Семен Алексеевич',
    score: 20,
  },
  {
    email: 'test2@gmail.com',
    name: 'Петр',
    score: 10,
  },
  {
    email: 'test4@gmail.com',
    name: 'Владислав Иванов',
    score: 7,
  },
  {
    email: 'test4@gmail.com',
    name: 'Никита Григорьевич',
    score: 6,
  },
  {
    email: 'test4@gmail.com',
    name: 'Иван Саломонович',
    score: 5,
  },
  {
    email: 'test@gmail.com',
    name: 'Лука Валентинович',
    score: 5,
  },
  {
    email: 'test2@gmail.com',
    name: 'Петро',
    score: 2,
  },
]

function Results() {
  return (
    <div className="results">
      {/* <h2>Таблица лидеров</h2> */}
      <div className="results__inner">
        <div className="results__my">
          <img
            src={`https://robohash.org/${sha1(me.name, me.email)}.png?bgset=bg1`}
            alt={me.name}
          />
          <span className="results__user-name results__my-name">{me.name}</span>
          <span className="results__user-score results__my-score">{me.score}</span>
        </div>
        <div className="results__table">
          {users.map((user, i) => {
            return (
              <div className="results__user">
                <div className="results__user-info">
                  <span className="results__user-place">{i+1}</span>
                  <img
                    src={`https://robohash.org/${sha1(user.name, user.email)}.png?bgset=bg1`}
                    alt={user.name}
                  />
                  <span className="results__user-name">{user.name}</span>
                </div>
                <span className="results__user-score ">{user.score}</span>
              </div>
            );
          })}
          
        </div>
      </div>
    </div>
  );
}

export default Results;
