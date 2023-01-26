import React from "react";
import styled from "styled-components";
import colors from "../constants/colors";

const NoMatch = () => {
  return (
    <NoMatchDiv>
      <H1>404</H1>
      <H2>No crafts here - try somewhere else</H2>
      <NoMatchImg src={require("../assets/404img.jpg")} />
    </NoMatchDiv>
  );
};

export default NoMatch;

const H1 = styled.h1`
  color: ${colors.craftWhite};
  font-weight: 900;
  font-size: 90px;
  z-index: 1;
  margin: 10px;
`;

const H2 = styled.h2`
  color: ${colors.craftWhite};
  font-weight: 900;
  font-size: 35px;
  z-index: 1;
  margin: 10px;
`;

const NoMatchDiv = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 35vh;
`;

const NoMatchImg = styled.img`
  position: absolute;
  top: 0;
  width: 100%;
`;
