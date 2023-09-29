import React, { useState } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import styled from "styled-components";
// import axios from "axios";
import "./style.css";

function Persona() {
  return (
    <PersonaWrapper>
      <Container>
        <ImageStyled src="/images/FindMomo.jpg" alt="반려동물 페르소나 보기" />
        <Link to="/pages/PersonaView">
          <button id="PersonaBtn" type="submit">
            페르소나 보기
          </button>
        </Link>
      </Container>
      <Container>
        <ImageStyled src="/images/postbox1.PNG" alt="반려동물과 대화하기" />
        <Link to="/pages/Chat">
          <button id="PersonaBtn" type="submit">
            대화 시작하기
          </button>
        </Link>
      </Container>
      <Container>
        <ImageStyled src="/images/writing.PNG" alt="반려동물의 일기 훔쳐보기" />
        <Link to="/pages/Diary">
          <button id="PersonaBtn" type="submit">
            일기 훔쳐보기
          </button>
        </Link>
      </Container>
    </PersonaWrapper>
  );
}

const PersonaWrapper = styled.div`
  margin: 0 auto;
  width: 1050px;
  height: auto;
  padding: 110px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 60px;
`;

const ImageStyled = styled.img`
  width: 180px;
  height: 190px;
  overflow: hidden;
`;

export default Persona;
