import React, { useState } from "react";
// import { Link, Routes, Route, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import "./style.css";

function MyPage() {
  return (
    <Wrapper>
      <h1>마이페이지</h1>
      <div id="imgContainer">
        <ImageStyled src="/images/myIcon.png" />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: auto;
  width: 800px;
  height: 800px;
  font-size: 15px;
  h1 {
    margin: auto;
    padding: 30px;
  }
`;
const ImageStyled = styled.img`
  width: 50px;
  height: auto;
`;

export default MyPage;
