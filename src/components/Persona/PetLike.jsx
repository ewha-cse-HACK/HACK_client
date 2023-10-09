import React, { useState } from "react";
// import { Link, Routes, Route, useNavigate } from "react-router-dom";
import styled from "styled-components";
// import axios from "axios";
// import "./style.css";

function PetLike() {
  return (
    <Wrapper>
      <h1>일기 훔쳐보기</h1>
      <img src="/images/writing.PNG" />
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

export default PetLike;
