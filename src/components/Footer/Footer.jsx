import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "./Footer.css";

function Footer() {
  return (
    <FooterWrapper>
      <div id="bottomMenu">
        <ul>
          <li>
            <Link to="https://github.com/ewha-cse-HACK">Github</Link>
          </li>
          <li>
            <Link to="/">Info</Link>
          </li>
          <li>
            <Link to="/">Explore</Link>
          </li>
          <li>
            <Link to="/">Pet Loss</Link>
          </li>
        </ul>
      </div>
      <div className="address">
        <p>이화여자대학교 컴퓨터공학과</p>
      </div>
    </FooterWrapper>
  );
}

const FooterWrapper = styled.footer`
  width: 1185px;
  height: 200px;
  margin: auto;
  margin-top: 50px;
  border-top: 1px solid #e7eaee;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  background-color: #000;
`;

export default Footer;
