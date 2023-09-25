import React, { Component, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import "./Header.css";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();

  //logout func
  const handleLogout = () => {
    setIsLoggedIn(false);
    //logout and redirect to Home
    history.push("/");
  };

  const Header = () => {
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        //스크롤 위치를 확인해 헤더를 고정할지 여부 선택
        if (window.scrollY > 100) {
          setIsSticky(true);
        } else {
          setIsSticky(false);
        }
      };

      window.addEventListener("scroll", handleScroll);

      //컴포넌트 언마운트 -> 이벤트 리스너 제거
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);

    return <header className={isSticky ? "sticky" : ""}>{<Header />}</header>;
  };
  //useEffect를 사용해 스크롤 이벤트를 감지하고 스크롤 위치에 따라 isSticky 상태 설정
  //스크롤 위치가 100px 이상이면 isSticky를 true로 설정하고 그렇지 않으면 false, 헤더 고정 제어

  return (
    <header>
      <div id="menu">
        <div id="logo">
          <Link to="/">
            <h1>Rainbow Letter</h1>
          </Link>
        </div>
        <nav>
          <ul id="topMenu">
            <li>
              <Link to="/our-story">Our Story</Link>
            </li>
            <li>
              <Link to="/persona">Persona</Link>
            </li>
            <li>
              <Link to="/community">Community</Link>
            </li>
            {isLoggedIn ? (
              <>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
                <li>
                  <Link to="/my-page">
                    <img src="/icon.png" alt="프로필" />
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
      <div className="seperator"></div>
    </header>
  );
}

export default Header;
