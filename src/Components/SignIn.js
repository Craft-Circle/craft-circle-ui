import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import colors from "../constants/colors";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, gql, useLazyQuery } from "@apollo/client";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [badPassword, setBadPassword] = useState(false);
  const [missingInfo, setMissingInfo] = useState(false);
  let navigate = useNavigate();

  const handleSignUp = () => {
    if (password === confirmPassword && email && password) {
      navigate("/profile");
      setBadPassword(false);
      setMissingInfo(false);
    } else if (password !== confirmPassword) {
      setBadPassword(true);
    } else {
      setMissingInfo(true);
    }
  };

  return (
    <LoginPageSection className="login-page">
      <LoginBox className="login-modal">
        <WelcomeMessage>Welcome to Craft Circle!</WelcomeMessage>
        <Text>Enter the below info to create your crafter profile</Text>
        {missingInfo && (
          <ErrorMessage>
            Info Missing: Please fill in all required fields.
          </ErrorMessage>
        )}
        <Label>Email:</Label>
        <Input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        {badPassword && (
          <ErrorMessage>Password doesn't match. Please try again.</ErrorMessage>
        )}
        <Label>Password:</Label>
        <Input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <Label>Confirm Password:</Label>
        <Input
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
        />
      </LoginBox>
      <Button action={handleSignUp} name="Sign Up" link="" />
    </LoginPageSection>
  );
};

export default SignIn;

const LoginPageSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;

const LoginBox = styled.div`
  height: 500px;
  width: 400px;
  background: white;
  border-radius: 25px;
  box-shadow: 20px 20px 0px ${colors.craftBlue};
  margin: 2%;
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

const WelcomeMessage = styled.h2`
  color: ${colors.craftBlue};
  margin: 0;
`;

const Text = styled.p`
  font-size: 15px;
  font-weight: 700;
  color: ${colors.craftBlue};
`;

const ErrorMessage = styled.p`
  font-size: 15px;
  font-weight: 700;
  color: ${colors.craftOrange};
`;
