import React, { useState } from "react";
// import { Link, Routes, Route, useNavigate } from "react-router-dom";
import styled from "styled-components";
// import axios from "axios";
// import "./style.css";

function Community() {
  return (
    <Wrapper>
      <img src="/images/writing.png" alt="글을 적고 있는 고양이" />
      <h1>무지개 커뮤니티</h1>
      <p>자유롭게 글을 쓰고, 사진을 올리고, 공감을 표시해주세요!</p>
    </Wrapper>
  );
}

export default Community;

const Wrapper = styled.div`
  width: 1000px;
  height: 500px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  text-align: center;
  align-items: center;
  margin: auto 0;

  img {
    width: 100px;
  }
`;
