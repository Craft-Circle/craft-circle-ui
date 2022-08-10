import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import colors from "../constants/colors";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, gql, useLazyQuery } from "@apollo/client";

const LOGIN_USER = gql`
  query loginAUser($email: String!, $password: String!) {
    details: loginAUser(email: $email, password: $password) {
      id
      name
      email
    }
  }
`;

const Login = ({ loginUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginAUser, { loading, error, data }] = useLazyQuery(LOGIN_USER);
  const [badLogin, setBadLogin] = useState(false);
  let navigate = useNavigate();

  const handleLogin = () => {
    loginAUser({ variables: { email: email, password: password } }).then(
      (data) => {
        //UPDATE HERE WITH CORRECT LOG IN INFO
        if (data.data) {
          setBadLogin(false);
          loginUser(data.data.details);
          navigate("/profile");
        } else {
          setBadLogin(true);
        }
      }
    );
  };

  return (
    <LoginPageSection className="login-page">
      <LoginBox className="login-modal">
        {badLogin && (
          <LoginError>Invalid email or password. Please try again.</LoginError>
        )}
        <Label>Email:</Label>
        <Input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <Label>Password:</Label>
        <Input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <Text>
          Don't have an account?{" "}
          <SignUpLink to="/signin">Sign up here</SignUpLink>
        </Text>
      </LoginBox>
      <Button action={handleLogin} name="Login" link="" />
    </LoginPageSection>
  );
};

export default Login;

const LoginPageSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const LoginBox = styled.div`
  height: 300px;
  width: 400px;
  background: white;
  border-radius: 25px;
  box-shadow: 20px 20px 0px ${colors.craftBlue};
  margin: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Input = styled.input`
  border-radius: 25px;
  width: 80%;
  height: 30px;
  margin: 5%;
  border: 1px solid ${colors.craftBlue};
  text-align: center;
`;

const Label = styled.label`
  font-size: 20px;
  font-weight: 700;
  color: ${colors.craftGreen};
`;

const Text = styled.p`
  font-size: 15px;
  font-weight: 700;
  color: ${colors.craftBlue};
`;

const SignUpLink = styled(Link)`
  font-size: 15px;
  font-weight: 700;
  color: ${colors.craftOrange};
`;

const LoginError = styled.p`
  font-size: 15px;
  font-weight: 700;
  color: ${colors.craftOrange};
`;
