import React, { useState } from "react";
import {  useHistory } from "react-router-dom";
import jwtDecode from "jwt-decode";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../../assets/scss/_login.scss";
import ApiService from "../../api/apiService";


const LoginForm = (props) => {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState();

  const Login = (email, password) => {
    let data = {
      email: email,
      password: password,
    };

    ApiService.Login(data)
      .then((response) => {
        if (response.data) {
          localStorage.setItem("token", JSON.stringify(response.data.data));
          localStorage.setItem(
            "user",
            JSON.stringify(response.data.data )
          );
          setLoading(false);
          history.push("/Dashboard");
        }
      })
      .catch((error) => {
        console.log(error);
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setMessage("Login failed. Please, check your email and password");
        setLoading(false);
        
      });
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setMessage("");
    Login(email, password);
    setLoading(true);
  };

  return (
    <>
      <Form onSubmit={handleLogin} className="sign-in-form">
        <div className="logo">
          <img src={props.logo} alt="logoFPT" />
          <h4>
            <span style={{ color: "blue" }}>C</span>
            <span style={{ color: "orange" }}>R</span>
            <span style={{ color: "green" }}>M</span> Managment
          </h4>
        </div>
        <div className="heading">
          <h2>Welcome Back</h2>
          <h6>Not registred yet? </h6>
          <a className="toggle" href="/Login" onClick={props.onClick}>
            Register
          </a>
        </div>
        <div className="actual-form">
          {/* Input Email */}
          <Form.Group className="input-wrap">
            <Form.Control
              autoFocus
              type="email"
              className="input-field"
              autoComplete="off"
              required
              placeholder="Email"
              value={email}
              onChange={onChangeEmail}
            />
          </Form.Group>
          {/* Input Password */}
          <Form.Group className="input-wrap">
            <Form.Control
              type="password"
              minLength="4"
              className="input-field"
              autoComplete="off"
              required
              placeholder="Password"
              value={password}
              onChange={onChangePassword}
            />
          </Form.Group>
          {/* Submit Button */}
          <Button
            block="true"
            size="lg"
            type="submit"
            className="sign-btn"
            disabled={loading}
          >
            {loading && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
            <span>Login</span>
          </Button>
          {/* Message after submit */}
          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
        </div>
      </Form>
    </>
  );
};

export default LoginForm;
