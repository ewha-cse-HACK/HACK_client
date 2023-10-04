import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "./Header.css";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태를 추적하는 상태 변수

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []); // 컴포넌트가 마운트될 때 로컬 스토리지에서 토큰을 읽어옴

  const handleLogout = () => {
    // 로그아웃 API 호출?
    setIsLoggedIn(false); // 로그아웃 상태로 변경
    localStorage.removeItem("token"); // 로컬 스토리지에서 토큰 제거
  };

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
            {isLoggedIn ? (
              <>
                <li>
                  <LogoutBtn onClick={handleLogout}>Logout</LogoutBtn>
                </li>
                <li>
                  <button id="goMyPage">
                    <Link to="/pages/MyPage">
                      <img src="/images/myPage.png" />
                    </Link>
                  </button>
                </li>
              </>
            ) : (
              <li>
                <StyledLink to="/pages/Login">Login</StyledLink>
              </li>
            )}
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

const LogoutBtn = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 17px;
  font-weight: bold;
  color: #343b6e;
  &:hover {
    color: #6d719b;
  }
`;

const Seperator = styled.div`
  width: 1800px;
  height: 1px;
  background-color: #e7eaee;
  margin: auto 0;
  margin-bottom: 20px;
  min-height: 1px;
`;

export default Header;
