import React, { useState } from "react";
// import { Link, Routes, Route, useNavigate } from "react-router-dom";
import styled from "styled-components";
// import axios from "axios";
// import "./style.css";

function Finished() {
  return (
    <Wrapper>
      <img src="/images/finished.png" />
      <h1>반려동물 페르소나 생성 완료!</h1>
      <p>
        당신의 마음이 무지개 별에 닿았어요!
        <br />
        이제부터 반려동물과 대화하고 일기를 볼 수 있어요.
      </p>
      <button>프로필 보기</button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: auto;
  width: 1000px;
  height: 800px;
  font-weight: medium;
  font-size: 15px;
`;

export default Finished;
