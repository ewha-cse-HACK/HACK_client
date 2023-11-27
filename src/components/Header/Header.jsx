import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import "./Header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  });

  const handleLogout = () => {
    // 로그아웃 API 호출?
    setIsLoggedIn(false); // 로그아웃 상태로 변경
    localStorage.removeItem("token"); // 로컬 스토리지에서 토큰 제거
    navigate("/");
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <HeaderWrapper>
        <div id="menu">
          <div id="logo">
            <Link to="/.">
              <h1>Rainbow Letter</h1>
            </Link>
          </div>
          {/*<MenuToggle onClick={handleMenuToggle}>
            <div />
            <div />
            <div />
          </MenuToggle>
          <MenuToggle onClick={handleMenuToggle}>*/}
          <nav>
            <ul id="topMenu">
              <li>
                <StyledLink to="/pages/Brand">Brand</StyledLink>
              </li>
              <li>
                <StyledLink to="/pages/Persona">Persona</StyledLink>
              </li>
              <li>
                <StyledLink to="/pages/Community">Community</StyledLink>
              </li>
              {isLoggedIn ? (
                <>
                  <li>
                    <LogoutBtn onClick={handleLogout}>Logout</LogoutBtn>
                  </li>
                  <li>
                    <button id="goMyPage">
                      <Link to="/pages/MyPage">
                        <img
                          src="https://hack-s3bucket.s3.ap-northeast-2.amazonaws.com/profile/pf_human.PNG"
                          style={{ width: "43px" }}
                        />
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
      </HeaderWrapper>
      <Seperator />
    </>
  );
}

const HeaderWrapper = styled.header`
  margin: auto;
  display: flex;
  width: 1200px;
  height: 148px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  @media (max-width: 768px) {
    width: 768px;
    height: 90px;
    padding: 5px;
    nav {
      display: block;
    }
  }
`;

const MenuToggle = styled.div`
  width: 30px;
  height: 30px;
  display: none;

  @media (max-width: 768px) {
    display: block; // 모바일 화면에서는 햄버거 메뉴를 보여줌
    cursor: pointer;
  }

  div {
    width: 30px;
    height: 3px;
    background-color: #000;
    margin: 6px 0;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000;
  &:hover {
    color: gray;
  }
  @media (max-width: 768px) {
    display: block;
  }
`;

const LogoutBtn = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  color: #343b6e;
  &:hover {
    color: #6d719b;
  }
  @media (max-width: 768px) {
    display: block;
  }
`;

const Seperator = styled.div`
  width: 100vw;
  height: 1px;
  background-color: #e7eaee;
  margin: auto 0;
  margin-bottom: 20px;
  min-height: 1px;
`;

export default Header;
