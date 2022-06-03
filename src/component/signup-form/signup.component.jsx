import { useState } from "react";
import AuthService from "../../utils/AuthService";
import { SignUpFormContainer } from "./signup.styles";
import { Form, Button } from "react-bootstrap";

const SignUpForm = () => {
  const defaultFormFields = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [formFields, setFormField] = useState(defaultFormFields);
  const { username, email, password, confirmPassword } = formFields;

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      alert("Password did not match!");
      return;
    }
    AuthService.register(username, email, password);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormField({ ...formFields, [name]: value });
  };
  return (
    <div>
      <SignUpFormContainer className="sign-up-form-container">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Bob"
              name="username"
              value={username}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="name@example.com"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="text"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              required
              type="text"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </SignUpFormContainer>
    </div>
  );
};

export default SignUpForm;
