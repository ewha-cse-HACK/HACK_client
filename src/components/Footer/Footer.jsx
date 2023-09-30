import React from "react";
import styled from "styled-components";
import "./Footer.css";

function Footer() {
  return (
    <FooterWrapper>
      <div id="bottomMenu">
        <ul>
          <li>Github</li>
          <li>Info</li>
          <li>Explore</li>
          <li>Pet Loss</li>
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
  background-color: #283064;

  #bottomMenu {
    margin: 20px;
    display: flex;
    justify-content: center;
  }
  #bottomMenu ul {
    display: flex;
    list-style: none;
    padding: 0;
    justify-content: center;
  }
  #bottomMenu ul li {
    font-family: DMSans;
    font-weight: Medium;
    font-size: 16px;
    text-align: center;
    margin: auto;
    padding: 20px;
    padding-bottom: 0px;
    color: #b0b2cd;
  }
`;

export default Footer;
