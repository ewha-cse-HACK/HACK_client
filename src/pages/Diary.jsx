import React, { useState } from "react";
// import { Link, Routes, Route, useNavigate } from "react-router-dom";
import styled from "styled-components";
// import axios from "axios";
// import "./style.css";

function Diary() {
  return (
    <Wrapper>
      <h1>일기 훔쳐보기</h1>
      <img src="/images/writing.PNG" />
      <PictureContainer>
        <p>사진이 올 자리</p>
      </PictureContainer>
      <TextContainer>
        <p>일기 텍스트가 올 자리</p>
      </TextContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: auto;
  width: 1000px;
  height: 800px;
  font-weight: medium;
  font-size: 15px;
  img {
    width: 100px;
  }
`;

const PictureContainer = styled.div`
  margin: auto;
  width: 400px;
  height: 400px;
`;

const TextContainer = styled.div`
  margin: auto;
  width: 400px;
  height: 400px;
`;

export default Diary;
