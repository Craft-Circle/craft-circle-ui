import React from "react";
import styled from "styled-components";
import colors from "../constants/colors";

const ColorChanger = ({ color, updateColor }) => {
  return (
    <ColorChangerSection className="color-changer">
      <Header style={{ color: colors[color] }}>Pick Profile Color:</Header>
      <ColorBar>
        <ColorBox
          className="color-box"
          onClick={() => updateColor("craftPurple")}
          style={{ background: colors.craftPurple }}
        ></ColorBox>
        <ColorBox
          className="color-box"
          onClick={() => updateColor("craftPink")}
          style={{ background: colors.craftPink }}
        ></ColorBox>
        <ColorBox
          className="color-box"
          onClick={() => updateColor("craftOrange")}
          style={{ background: colors.craftOrange }}
        ></ColorBox>
        <ColorBox
          className="color-box"
          onClick={() => updateColor("craftGreen")}
          style={{ background: colors.craftGreen }}
        ></ColorBox>
        <ColorBox
          className="color-box"
          onClick={() => updateColor("craftBlue")}
          style={{ background: colors.craftBlue }}
        ></ColorBox>
        <ColorBox
          className="color-box"
          onClick={() => updateColor("craftGrey")}
          style={{ background: colors.craftGrey }}
        ></ColorBox>
      </ColorBar>
    </ColorChangerSection>
  );
};

export default ColorChanger;

const ColorChangerSection = styled.section`
  width: 85vw;
  display: flex;
  margin-top: 5%;
  flex-direction: column;
  justify-content: center;
`;

const Header = styled.h2`
  align-self: center;
  font-size: 25px;
  font-weight: 900;
`;

const ColorBar = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 5%;
`;

const ColorBox = styled.div`
  width: 50px;
  height: 50px;
  margin: 10px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    margin-right: 15px;
    margin-bottom: 15px;
    margin-left: 5px;
    margin-top: 5px;
    box-shadow: 5px 5px 0px ${colors.craftBlack};
  }
`;
