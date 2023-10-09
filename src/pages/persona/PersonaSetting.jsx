import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import "../style.css";

function PersonaSetting() {
  const [speciesName, setSpeciesName] = useState("");
  const navigate = useNavigate();
  const [showTopButton, setShowTopButton] = useState(false);
  const token = localStorage.getItem("token");

  // 페이지 맨 위로 스크롤하는 함수
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // 이전 화면으로 이동
  const goBack = () => {
    navigate(-1);
  };

  return (
    <SettingWrapper>
      <div id="personaStart">
        <h1>페르소나를 만들어 볼까요?</h1>
        <p>반려동물의 종을 선택해 주세요.</p>
      </div>
      <div id="cardContainer">
        <img src="/images/card_dog.png" alt="반려동물은 강아지!" />
        <ImageStyled src="/images/card_cat2.png" alt="반려동물은 고양이!" />
        <img src="/images/card_bird.png" alt="반려동물은 새!" />
        <img src="/images/card_ham.png" alt="반려동물은 햄스터!" />
        <img src="/images/card_nothere.png" alt="여기 없어요. 직접 쓸래요" />
      </div>
      <div className="scroll-buttons">
        {showTopButton && (
          <button className="top-button" onClick={scrollToTop}>
            Top
          </button>
        )}
      </div>
    </SettingWrapper>
  );
}

const SettingWrapper = styled.div`
  margin: auto;
  padding: 20px;
  width: 1185px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
const ImageStyled = styled.img`
  margin-top: 23px;
`;

export default PersonaSetting;
