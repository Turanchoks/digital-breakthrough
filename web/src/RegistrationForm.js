import * as React from "react";
import axios from "axios";
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
  Divider
} from "semantic-ui-react";
import sha1 from "js-sha1";
import avatar from "./images/nicecat.jpg";

import "./RegForm.css";

const BreachAccountData = [
  {
    Name: "Collection1"
  },
  {
    Name: "ExploitIn"
  },
  {
    Name: "KayoMoe"
  },
  {
    Name: "NexusMods"
  },
  {
    Name: "Tumblr"
  },
  {
    Name: "XSplit"
  }
];

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
  console.log(state);
  // const { isFetching, error, data, update } = useAxiosRequest(`/api/hibp/breachedaccount/${email}`);

  return (
    <Form
      style={{
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Image src={avatar} size="medium" circular />
      <Form.Field>
        <label>Имя</label>
        <input
          placeholder="Имя"
          onChange={e =>
            dispatch({ type: "change name", payload: e.target.value })
          }
          value={name}
        />
      </Form.Field>
      <Form.Field>
        <label>E-mail</label>
        <input
          placeholder="E-mail"
          onChange={e =>
            dispatch({ type: "change email", payload: e.target.value })
          }
          value={email}
        />
      </Form.Field>
      <Form.Field>
        <label>Пароль</label>
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
          label="Согласен на всё"
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
              <Header>Первое всё</Header>
              <Divider />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Aperiam, mollitia iusto tempore atque nobis quam, vitae nisi,
                ipsum culpa totam fuga? Pariatur aliquid aut, possimus expedita
                dolorum odio harum. Deleniti?
              </p>
              <Divider />
              <Header>Второе всё</Header>
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
              Прочитал и согласен <Icon name="right chevron" />
            </Button>
          </Modal.Actions>
        </Modal>
      </Form.Field>
      <Button
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
  return (
    <List>
      {props.hacks && (
        <List.Item>
          <Icon name="exclamation circle" color="red" />
          Apples
        </List.Item>
      )}
    </List>
  );
};
// `/api/hibp/breachedaccount/${email}`

export const RegistrationForm = () => {
  const [isRegistered, setIsRegistered] = React.useState(false);
  const [isFetching, setIsFetching] = React.useState(false);
  const [endProps, setEndProps] = React.useState(null);
  const submit = async state => {
    setIsFetching(true);
    console.log('checks 0', state)
    const checks = await Promise.all([
       axios.post(`http://localhost:9000/register`, { ...state, pass: state.sha1Pass }),
       axios.get(`http://localhost:9000/breach?email=${state.email}`),
       axios.get(`http://localhost:9000/passbreach?pass=${state.sha1Pass}`)
     ])
    console.log('checks', checks)
    setIsRegistered(true);
    setEndProps(state);
  };
  return (
    <Card
      style={{
        padding: "20px 30px"
      }}
    >
      {!isRegistered ? (
        <RegistrationFormStart submit={submit} />
      ) : (
        <RegistrationFormEnd {...endProps} />
      )}
    </Card>
  );
};
