import React from "react";
import styled from "styled-components";
import "./Footer.css";

function Footer() {
  return (
    <FooterWrapper>
      <div id="bottomMenu">
        <ul>
          <li>
            <a
              href="https://github.com/orgs/ewha-cse-HACK/repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="no-style"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href="https://youtu.be/NFmeN01eHdY"
              target="_blank"
              rel="noopener noreferrer"
              className="no-style"
            >
              Youtube
            </a>
          </li>
          <li>
            <a
              href="https://careful-prose-033.notion.site/HACK-7ea2f3ab393d4d9ea9cda5a44c6527df?pvs=4"
              target="_blank"
              rel="noopener noreferrer"
              className="no-style"
            >
              Info
            </a>
          </li>
          <li>
            <a
              href="https://www.psychiatricnews.net/news/articleView.html?idxno=33625"
              target="_blank"
              rel="noopener noreferrer"
              className="no-style"
            >
              Pet Loss
            </a>
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
  @media (max-width: 768px) {
    width: 100%;
    height: 200px;
  }
  width: 100%;
  height: 200px;
  margin: auto;
  /* border-top: 1px solid #e7eaee; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  background-color: #000027;

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
    font-weight: Medium;
    font-size: 16px;
    text-align: center;
    margin: auto;
    padding: 20px;
    padding-bottom: 0px;
    color: #e9f5ff;
  }
  a.no-style {
    text-decoration: none;
    color: white;
  }
  .address {
    width: 100%;
    margin: 30px;
    text-align: center;
    font-weight: bold;
    font-size: 20px;
    color: #e9f5ff;
  }
`;

export default Footer;
