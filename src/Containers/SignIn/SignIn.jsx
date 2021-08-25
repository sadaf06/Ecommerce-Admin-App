import { React, useState } from "react";
import Layout from "../../Components/Layout/indexLayout";
import { Form, Button, Container } from "react-bootstrap";
import { login } from "./SignInAction";
import { useDispatch, useSelector } from "react-redux";
import UI from "../../Components/Layout/Ui";
import { Redirect } from "react-router";
/**
 * @author
 * @function Signin
 **/

const SignIn = (props) => {
  // use Hooks for signIn data changes
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, thrErr] = useState("");
  const dispatch = useDispatch();
  // Login user
  const userLogin = (e) => {
    e.preventDefault();

    const user = {
      email: email.toLowerCase(),
      password,
    };
    dispatch(login(user));
  };
  const auth = useSelector((state) => state.auth);

  if (auth.authenticate) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <Layout>
        <Container className="col-6 col-md-6 my-3">
          <Form onSubmit={userLogin}>
            <UI
              label="Email"
              type="email"
              holder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <UI
              label="Password"
              type="password"
              holder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      </Layout>
    </div>
  );
};

export default SignIn;
