import * as React from "react";
import { Button, Checkbox, Form, Card, Icon, List } from "semantic-ui-react";
import { useAxiosRequest } from "use-axios-request";
import sha1 from "js-sha1";

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

const RegistrationFormStart = ({ submit }) => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [check, setCheck] = React.useState(false);
  const isDisabledSubmit = !(name && email && pass && check);
  return (
    <Form>
      <Form.Field>
        <label>Имя</label>
        <input
          placeholder="Имя"
          onChange={e => setName(e.target.value)}
          value={name}
        />
      </Form.Field>
      <Form.Field>
        <label>E-mail</label>
        <input
          placeholder="E-mail"
          onChange={e => setEmail(e.target.value)}
          value={email}
        />
      </Form.Field>
      <Form.Field>
        <label>Пароль</label>
        <input
          placeholder="Пароль"
          onChange={e => setPass(e.target.value)}
          value={pass}
          type="password"
        />
      </Form.Field>
      <Form.Field>
        <Checkbox
          label="Согласен на всё"
          checked={check}
          onClick={() => {
            setCheck(!check);
          }}
        />
      </Form.Field>
      <Button type="submit" disabled={isDisabledSubmit} onClick={submit} color='blue'>
        Зарегистрироваться
      </Button>
    </Form>
  );
};

const RegistrationFormEnd = () => {
  return (
    <List>
      <List.Item>
        <Icon name="exclamation circle" color="red" />
        Apples
      </List.Item>
    </List>
  );
};
// `/api/hibp/breachedaccount/${email}`

export const RegistrationForm = () => {
  const [isRegistered, setIsRegistered] = React.useState(false);
  const { isFetching, error, data, update } = useAxiosRequest();
  // const submit = () => {};
  return (
    <Card
      style={{
        padding: 10
      }}
    >
      {!isRegistered ? (
        <RegistrationFormStart submit={() => {}} />
      ) : (
        <RegistrationFormEnd />
      )}
    </Card>
  );
};
