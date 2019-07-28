import * as React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { animated, useSpring } from "react-spring/hooks";
import {
  Button,
  Checkbox,
  Form,
  Icon,
  List,
  Image,
  Modal,
  Header,
  Divider,
} from "semantic-ui-react";
import sha1 from "js-sha1";

import "./RegForm.css";

const WARNING_COLOR = "rgba(210, 64, 39, .9)";
const NORMAL_COLOR = "#2C95FF";

const formReducer = (state, action) => {
  switch (action.type) {
    case "change name":
      return { ...state, name: action.payload };
    case "change email":
      return { ...state, email: action.payload };
    case "change pass":
      return { ...state, pass: action.payload, sha1Pass: sha1(action.payload) };
    case "change check":
      return { ...state, check: !state.check };
    case "change rules":
      return { ...state, rules: true, modal: false, check: true };
    case "open modal":
      return { ...state, modal: true };
    case "close modal":
      return { ...state, modal: false };
    default:
      throw new Error();
  }
};

const RegistrationFormStart = ({ submit }) => {
  const [state, dispatch] = React.useReducer(formReducer, {
    name: "",
    email: "",
    pass: "",
    sha1Pass: "",
    check: false,
    rules: false
  });
  const { name, email, pass, check, rules, sha1Pass } = state;
  const isDisabledSubmit = !(name && email && pass && check);
  // const { isFetching, error, data, update } = useAxiosRequest(`/api/hibp/breachedaccount/${email}`);

  return (
    <Form
      style={{
        display: "flex",
        flexDirection: "column",
        width: '100%',
      }}
    >
      <Image
        src='/avatar.png'
        size="small"
        circular
        style={{
          margin: "0 auto 20px",
          width: '100px',
          height: '100px',
        }}
      />
      <Form.Field>
        <input
          placeholder="Имя"
          onChange={e =>
            dispatch({ type: "change name", payload: e.target.value })
          }
          value={name}
        />
      </Form.Field>
      <Form.Field>
        <input
          placeholder="E-mail"
          onChange={e =>
            dispatch({ type: "change email", payload: e.target.value })
          }
          value={email}
        />
      </Form.Field>
      <Form.Field>
        <input
          placeholder="Пароль"
          onChange={e =>
            dispatch({ type: "change pass", payload: e.target.value })
          }
          value={pass}
          type="password"
        />
      </Form.Field>
      <Form.Field>
        <Checkbox
          label="Согласен c правилами"
          checked={check}
          onClick={() => {
            dispatch({ type: "change check" });
          }}
        />

        <Modal
          trigger={
            <Icon
              link
              name="question circle outline"
              size="small"
              onClick={() => {
                dispatch({ type: "open modal" });
              }}
              style={{
                color: '#000',
                opacity: .3,
                marginLeft: '3px',
                fontSize: '10px',
              }}
            />
          }
          open={state.modal}
          onClose={() => {
            dispatch({ type: "close modal" });
          }}
        >
          <Modal.Header>Соглашение на всё</Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              <Header>Первое правило</Header>
              <Divider />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Aperiam, mollitia iusto tempore atque nobis quam, vitae nisi,
                ipsum culpa totam fuga? Pariatur aliquid aut, possimus expedita
                dolorum odio harum. Deleniti?
              </p>
              <Divider />
              <Header>Второе правило</Header>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Aperiam, mollitia iusto tempore atque nobis quam, vitae nisi,
                ipsum culpa totam fuga? Pariatur aliquid aut, possimus expedita
                dolorum odio harum. Deleniti?
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Aperiam, mollitia iusto tempore atque nobis quam, vitae nisi,
                ipsum culpa totam fuga? Pariatur aliquid aut, possimus expedita
                dolorum odio harum. Deleniti?
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Aperiam, mollitia iusto tempore atque nobis quam, vitae nisi,
                ipsum culpa totam fuga? Pariatur aliquid aut, possimus expedita
                dolorum odio harum. Deleniti?
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Aperiam, mollitia iusto tempore atque nobis quam, vitae nisi,
                ipsum culpa totam fuga? Pariatur aliquid aut, possimus expedita
                dolorum odio harum. Deleniti?
              </p>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button
              primary
              onClick={() => {
                dispatch({ type: "change rules" });
              }}
            >
              Прочитал(а) и согласен(на) <Icon name="right chevron" />
            </Button>
          </Modal.Actions>
        </Modal>
      </Form.Field>
      <Button
        className="registration-form__submit"
        type="submit"
        disabled={isDisabledSubmit}
        onClick={() => {
          submit(state);
        }}
        primary
      >
        Зарегистрироваться
      </Button>
    </Form>
  );
};

const RegistrationFormEnd = props => {
  const emailBreached = props.emailCheck.length > 0;
  const passLeaked = props.passCheck;
  const rulesNotRead = !props.rules;
  return (
    <div
      style={{
        width: 300,
        display: "flex",
        flexDirection: "column",
        padding: '0 20px',
      }}
    >
      <Image
        src='/avatar-pirate.png'
        size="small"
        circular
        style={{
          margin: "0 auto 20px",
          width: '100px',
          height: '100px',
        }}
      />
      <List style={{
        color: '#000',
      }}>
        {(emailBreached || passLeaked) ? (
          <List.Item style={{ display: 'flex', alignItems: 'center', marginBottom: '25px' }}>
            <List.Icon style={{ fontSize: '34px', lineHeight: '34px', color: '#D24027'  }} name="exclamation circle" />
            <List.Content style={{ textAlign: 'left' }}>
              Согласно{" "}
              <a target="_blank" href="https://haveibeenpwned.com">haveibeenpwned.com</a> ваши
              авторизационные данные находятся в публичном доступе
              <p style={{ fontWeight: 'bold', color: '#2C95FF' }}>
                Рекомендуем вам сменить пароль
              </p>
            </List.Content>
          </List.Item>
        ) : 
        <List.Item style={{ display: 'flex', alignItems: 'center', marginBottom: '25px' }}>
          <List.Icon style={{ fontSize: '34px', lineHeight: '34px', color: '#00C9C8' }} name="check circle" />
          <List.Content style={{ textAlign: 'left' }}>
            Мы проверили ваши данные по базам{" "}
            <a target="_blank" href="https://haveibeenpwned.com">haveibeenpwned.com</a>. Все в порядке.
          </List.Content>
        </List.Item>
        }
        {rulesNotRead ? (
          <List.Item style={{ display: 'flex', alignItems: 'center', }}>
            <List.Icon style={{ fontSize: '34px', lineHeight: '34px', color: '#D24027' }} name="exclamation circle"/>
            <List.Content style={{ textAlign: 'left' }}>
              Вы согласились с правилами, которые не прочитали
              <p style={{ fontWeight: 'bold', color: '#2C95FF' }}>
                Всегда внимательно читайте правила
              </p>
            </List.Content>
          </List.Item>
        ) 
        : (
          <List.Item style={{ display: 'flex', alignItems: 'center', }}>
            <List.Icon style={{ fontSize: '34px', lineHeight: '34px', color: '#00C9C8' }} name="check circle"/>
            <List.Content style={{ textAlign: 'left' }}>
              Молодец! Вы прочитали правила сайта, относитесь к этому внимательно
            </List.Content>
          </List.Item>
        )}
      </List>
      <Link className="ui positive button registration-form__next" to="/swiper-splash">
        Далее
      </Link>
    </div>
  );
};
// `/api/hibp/breachedaccount/${email}`

export const RegistrationForm = () => {
  const [isRegistered, setIsRegistered] = React.useState(false);
  const [endProps, setEndProps] = React.useState(null);
  const [emailCheck, setEmailCheck] = React.useState(null);
  const [passCheck, setPassCheck] = React.useState(null);
  const [prevEndProps, setPrevEndProps] = React.useState(null);
  if (endProps !== prevEndProps) {
    setPrevEndProps(endProps);
  }
  React.useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        axios.get(`/breach?email=${endProps.email}`),
        axios.get(`/passbreach?pass=${endProps.sha1Pass}`),
        axios.post(`/register`, {
          ...endProps,
          pass: endProps.sha1Pass
        })
      ]).then(checkData => {
        if (checkData) {
          setEmailCheck(checkData[0].data);
          setPassCheck(checkData[1].data);
          console.log(checkData);
          setIsRegistered(true);
        }
      });
    };
    if (endProps) fetchData();
  }, [endProps]);
  const { transform, opacity } = useSpring({
    opacity: isRegistered ? 1 : 0,
    transform: `perspective(600px) rotateY(${isRegistered ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 }
  });
  return (
    <div
      className="registration-wrapper"
      style={{
        backgroundColor: isRegistered ? WARNING_COLOR : NORMAL_COLOR
      }}
    >
      {!isRegistered ? (
        <animated.div
          className="registration-form__container"
          style={{ opacity: opacity.interpolate(o => 1 - o), transform }}
        >
          <RegistrationFormStart submit={state => setEndProps(state)} />
        </animated.div>
      ) : (
        <animated.div
          className="registration-form__container"
          style={{
            opacity,
            transform: transform.interpolate(t => `${t} rotateY(180deg)`)
          }}
        >
          <RegistrationFormEnd
            {...endProps}
            emailCheck={emailCheck}
            passCheck={passCheck}
          />
        </animated.div>
      )}
    </div>
  );
};