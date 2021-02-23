import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Button, Form } from "react-bootstrap";
import LoadingPage from "../Common/Loading";

import { loginUser } from "../../services/authService";

const LoginPage = (): any => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // if (user) {
  //   return <Redirect to="/" />;
  // }

  const history = useHistory();

  const validateForm = () => {
    return email.length > 0 && password.length > 0;
  };
  if (loading) {
    return <LoadingPage />;
  }

  const googleLogin = () => {
    return (window.location.href = "/auth/google");
  };

  

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    await loginUser({ email, password });
  };

  return (
    <Row className="justify-content-md-center">
      <Col md="12" className="text-center">
        <h3>Log in</h3>
      </Col>
      <Col md="auto">
        <div className="Login">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                autoFocus
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button block size="lg" type="submit" disabled={!validateForm()}>
              Login
            </Button>
          </Form>
        </div>
      </Col>

      <Col md="12" className="text-center pt-4">
        <h3>Or</h3>
      </Col>
      <Col md="auto" className="text-center pt-4">
        <Button
          block
          size="lg"
          type="button"
          onClick={() => googleLogin()}
          style={{ width: "11em" }}
        >
          Google login
        </Button>
      </Col>
    </Row>
  );
};

export default LoginPage;
