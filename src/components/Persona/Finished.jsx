import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
// import axios from "axios";
// import "./style.css";

function Finished() {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <img src="/images/finished.png" />
      <h1>반려동물 페르소나 생성 완료!</h1>
      <p>
        당신의 마음이 무지개 별에 닿았어요!
        <br />
        이제 반려동물과 대화해볼까요?
      </p>
      <button onClick={() => navigate("/pages/Persona")}>프로필 보기</button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 100px;
  h1 {
    margin: 30px;
    margin-bottom: 20px;
    font-weight: 900;
    font-size: 40px;
  }
  p {
    font-size: 20px;
    font-weight: 500px;
    margin-bottom: 30px;
  }
  img {
    width: 450px;
  }
  button {
    border: none;
    border-radius: 56px;
    background: #fc8e8f;
    color: white;
    width: 197px;
    height: 51px;
    cursor: pointer;
    font-size: 19px;
    font-weight: 900;
    &:hover {
      background: black;
    }
  }
`;

export default Finished;
