import React, { useState } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import "./style.css";
import CommunityPost from "./community/CommunityPost";
import EachPost from "../components/EachPost";

function Community() {
  const navigate = useNavigate();

  return (
    <ComWrapper>
      <img
        src="https://github.com/ewha-cse-HACK/HACK_client/blob/76182d96902b703f123e5d282dfd2c96d73954e7/public/images/writing.PNG"
        alt="글을 적고 있는 고양이"
      />
      <h1 id="rainbowPlatform">무지개 광장</h1>
      <p>자유롭게 글을 쓰고, 사진을 올리고, 공감을 표시해주세요!</p>
      <button onClick={() => navigate("/pages/community/CommunityPost")}>
        글 쓰기
      </button>
      <EachPost />
    </ComWrapper>
  );
}

export default Community;

const ComWrapper = styled.div`
  margin: auto;
  max-width: 1000px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  text-align: center;
  align-items: center;
  img {
    width: 100px;
  }
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
