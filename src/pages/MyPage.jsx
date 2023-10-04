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
        <img src="/images/myIcon.png" />
      </div>
    </Wrapper>
  );
}

export default MyPage;

const Wrapper = styled.div`
  margin: auto;
  width: 1000px;
  height: 800px;
  font-family: DMSans;
  font-weight: medium;
  font-size: 15px;
`;
