import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import "../style.css";
import Fab from "@mui/material/Fab";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function PersonaSetting() {
  return (
    <>
      <BackButton>
        <Link to="/pages/Persona">
          <Fab color="gray" aria-label="back">
            <ArrowBackIcon />
          </Fab>
        </Link>
      </BackButton>
      <SettingWrapper>
        <div id="personaStart">
          <h1>페르소나를 만들어 볼까요?</h1>
          <p>반려동물의 종을 선택해 주세요.</p>
        </div>
        <div id="cardContainer">
          <Link to="/pages/persona/PersonaDog">
            <img src="/images/card_dog.png" alt="반려동물은 강아지!" />
          </Link>
          <Link to="/pages/persona/PersonaCat">
            <ImageStyled src="/images/card_cat2.png" alt="반려동물은 고양이!" />
          </Link>
          <Link to="/pages/persona/PersonaBird">
            <img src="/images/card_bird.png" alt="반려동물은 새!" />
          </Link>
          <Link to="/pages/persona/PersonaHam">
            <img src="/images/card_ham.png" alt="반려동물은 햄스터!" />
          </Link>
          <Link to="/pages/persona/PersonaOthers">
            <img
              src="/images/card_nothere.png"
              alt="여기 없어요. 직접 쓸래요"
            />
          </Link>
        </div>
      </SettingWrapper>
    </>
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
  margin-top: 22px;
`;
const BackButton = styled.div`
  margin: 30px;
  margin-left: 200px;
`;
export default PersonaSetting;
