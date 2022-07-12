import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NavBar = () => {
  return (
    <Nav className="nav-bar">
      <Img
        className="logo"
        src={require("../assets/CraftCircleLogo-06.png")}
        alt="craft circle logo"
      />
      <div>
        <NavLink to={"/"}>
          <Button className="nav-button">
            <h3>All Crafts</h3>
          </Button>
        </NavLink>
        <NavLink to={"about"}>
          <Button className="nav-button">
            <h3>About</h3>
          </Button>
        </NavLink>
        <NavLink to={"profile"}>
          <Button className="nav-button">
            <h3>Profile</h3>
          </Button>
        </NavLink>
      </div>
    </Nav>
  );
};

export default NavBar;

const Button = styled.button`
  background: #f4ecdd;
  border: none;
  font-size: 25px;
  color: #a7c891;
  margin: 25px;
  &: hover {
    color: #e3976e;
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 25px;
`;

const Img = styled.img`
  height: 150px;
`;
