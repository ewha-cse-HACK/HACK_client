import React, { useState } from "react";
// import { Link, Routes, Route, useNavigate } from "react-router-dom";
import styled from "styled-components";
// import axios from "axios";
// import "./style.css";
import { DotLoader } from "react-spinners";

function Loading() {
  return (
    <Wrapper>
      <DotLoader color="#343B6E" size={15} />
      <h1>Now Loading . . .</h1>
    </Wrapper>
  );
}

export default Loading;

const Wrapper = styled.div`
  margin: auto;
  width: 1000px;
  height: 800px;
  font-family: DMSans;
  font-weight: medium;
  font-size: 20px;
`;
