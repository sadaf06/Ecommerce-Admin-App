import React, { useState } from "react";
import Layout from "../../Components/Layout/indexLayout";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import UI from "../../Components/Layout/Ui";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { signUpAction } from "./signUpAction";
/**
 * @author
 * @function SignUp
 **/

const SignUp = (props) => {
  const auth = useSelector((state) => state.auth);
  const signUpAuth = useSelector((state) => state.SignUpAuth);
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [email, setemail] = useState("");
  let [password, setpasswrd] = useState("");
  let [contact, setnumber] = useState("");
  const dispatch = useDispatch();
  const signUp = (e) => {
    e.preventDefault();
    const user = {
      firstName,
      lastName,
      email,
      password,
      contact,
    };
    dispatch(signUpAction(user));
  };

  const signUpSucces = () => {
    if (signUpAuth.signUpAuthenticate) {
      firstName = "";
      lastName = "";
      email = "";
      password = "";
      contact = "";
      return (
        <p className="text-success bg-dark py-2 px-2">
          {signUpAuth.user.firstName} is Registered Succesfully.
        </p>
      );
    }
  };
  if (auth.authenticate) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <Layout>
        <Container className="col-6 col-md-6 my-3">
          {signUpSucces()}
          <Form onSubmit={signUp}>
            <Row>
              <Col md={6}>
                <UI
                  label="First Name"
                  type="text"
                  holder="Enter your first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Col>
              <Col md={6}>
                <UI
                  label="Last Name"
                  type="text"
                  holder="Enter your Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Col>
            </Row>
            <UI
              label="Email"
              type="email"
              holder="Enter your email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />

            <UI
              label="Password"
              type="password"
              holder="Enter your password"
              value={password}
              onChange={(e) => setpasswrd(e.target.value)}
            />
            <UI
              label="Mobile Number"
              type="number"
              holder="Enter your Number"
              value={contact}
              onChange={(e) => setnumber(e.target.value)}
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

export default SignUp;
