import React, { useState } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import "../style.css";

function CommunityEdit() {
  const navigate = useNavigate();

  return (
    <ComWrapper>
      <h1>포스트 수정</h1>
      <button>이전</button>
      <button>완료</button>
    </ComWrapper>
  );
}

const ComWrapper = styled.div`
  margin: auto;
  max-width: 1000px;
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  text-align: center;
  align-items: center;
  button {
    display: flex;
    width: 121px;
    height: 37px;
    justify-content: center;
    align-items: center;
    font-size: 17px;
    font-weight: bold;
    gap: 8px;
    border-radius: 56px;
    border: none;
    color: #fff;
    background: #8bcef4;
    cursor: pointer;
    &:hover {
      background: #bae2fa;
    }
  }
`;

export default CommunityEdit;
