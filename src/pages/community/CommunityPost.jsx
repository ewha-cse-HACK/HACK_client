import React, { useState } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import "../style.css";

function CommunityPost() {
  const navigate = useNavigate();

  return (
    <ComWrapper>
      <h1>포스트 작성</h1>
      <Container>
        <PostPic>
          <h5>사진 업로드</h5>
          <p>(10장까지 선택 가능)</p>
          <button>사진 선택</button>
        </PostPic>
        <Editor />
      </Container>
      <Container>
        <button>취소</button>
        <button>완료</button>
      </Container>
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
    margin: 10px;
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
const PostPic = styled.div`
  width: 200px;
  height: 200px;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid blue;
  button {
    width: 133px;
    height: 37px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    cursor: pointer;
    background: #8bcef4;
    &:hover {
      background: #bae2fa;
    }
  }
`;
const Editor = styled.div`
  width: 200px;
  height: 200px;
  margin: auto;
  border: 1px solid purple;
`;
const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px;
  border: 1px solid black;
`;

export default CommunityPost;
