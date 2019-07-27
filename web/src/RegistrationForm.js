import * as React from "react";
import axios from "axios";
import {
  useSprings,
  animated,
  interpolate,
  useSpring
} from "react-spring/hooks";
import {
  Button,
  Checkbox,
  Form,
  Card,
  Icon,
  List,
  Image,
  Modal,
  Header,
  Divider,
  Segment,
  Dimmer,
  Loader
} from "semantic-ui-react";
import sha1 from "js-sha1";
import avatar from "./images/nicecat.jpg";

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
        flexDirection: "column"
      }}
    >
      <Image
        src={avatar}
        size="medium"
        circular
        style={{
          margin: "0 auto",
          paddingBottom: 20
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
              name="help"
              size="small"
              onClick={() => {
                dispatch({ type: "open modal" });
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
        type="submit"
        // disabled={isDisabledSubmit}
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
  const emailBreached = true;
  const passLeaked = true;
  const rulesNotRead = !props.rules;
  console.log(props);
  return (
    <div
      style={{
        width: 300,
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Image
        src={avatar}
        size="medium"
        circular
        style={{
          margin: "0 auto",
          paddingBottom: 20
        }}
      />
      <List>
        {(emailBreached || passLeaked) && (
          <List.Item>
            <List.Icon name="exclamation circle" color="red" />
            <List.Content>
              Согласно{" "}
              <a href="https://haveibeenpwned.com">haveibeenpwned.com</a> ваши
              авторизационные данные находятся в публичном доступе
            </List.Content>
          </List.Item>
        )}
        {rulesNotRead && (
          <List.Item>
            <List.Icon name="exclamation circle" color="red" />
            <List.Content>
              Вы согласились с правилами, которые не прочитали
            </List.Content>
          </List.Item>
        )}
      </List>
      <Button
        type="submit"
        onClick={() => {
          console.log("dalee");
          props.goBack();
        }}
        positive
      >
        Далее
      </Button>
    </div>
  );
};
// `/api/hibp/breachedaccount/${email}`

export const RegistrationForm = () => {
  const [isRegistered, setIsRegistered] = React.useState(false);
  const [isFetching, setIsFetching] = React.useState(false);
  const [endProps, setEndProps] = React.useState(null);
  const submit = async state => {
    setIsFetching(true);
    console.log("checks 0", state);
    const checks = await Promise.all([
      axios.post(`http://localhost:9000/register`, {
        ...state,
        pass: state.sha1Pass
      }),
      axios.get(`http://localhost:9000/breach?email=${state.email}`),
      axios.get(`http://localhost:9000/passbreach?pass=${state.sha1Pass}`)
    ]);
    setIsFetching(false);
    console.log("checks", checks);
    setIsRegistered(true);
    setEndProps({
      ...state
      // emailCheck: checks[0].data,
      // passCheck: checks[1].data
    });
  };
  const { transform, opacity } = useSpring({
    opacity: isRegistered ? 1 : 0,
    transform: `perspective(600px) rotateY(${isRegistered ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 }
  });
  console.log(isRegistered);
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
          <RegistrationFormStart submit={submit} />
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
            goBack={() => setIsRegistered(false)}
          />
        </animated.div>
      )}
    </div>
  );
};

// isFetching ? (
//   <Segment>
//     <Dimmer active>
//       <Loader />
//     </Dimmer>
//   </Segment>
