import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "./Header.css";

function Header() {
  return (
    <HeaderWrapper>
      <div id="menu">
        <div id="logo">
          <Link to="/">
            <h1>Rainbow Letter</h1>
          </Link>
        </div>
        <nav>
          <ul id="topMenu">
            <li>
              <StyledLink to="/">Our Story</StyledLink>
            </li>
            <li>
              <StyledLink to="/pages/Persona">Persona</StyledLink>
            </li>
            <li>
              <StyledLink to="/pages/Commnunity">Community</StyledLink>
            </li>
            <li>
              <StyledLink to="/pages/Login">Login</StyledLink>
            </li>
          </ul>
        </nav>
      </div>
      <Seperator />
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header`
  margin: auto;
  padding: 20px 128px 16px;
  display: flex;
  width: 1200px;
  height: 152px;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000;
  &:hover {
    color: gray;
  }
`;

const Seperator = styled.div`
  width: 1185px;
  height: 1px;
  background-color: #e7eaee;
  margin: auto 0;
  margin-bottom: 20px;
  min-height: 1px;
`;

export default Header;
