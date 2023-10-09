import React, { useState, useEffect } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
// import "./style.css";

function Diary() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post("http://13.209.173.241:8080/", {
      headers: {
        "X-ACCESS-TOKEN": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log(response.data);

    navigate(-1);
  };

  return (
    <Wrapper>
      <Headtext>
        <img src="/images/writing.PNG" />
        <h1>햄식이의 일기를 훔쳐볼까요?</h1>
        <p>
          햄식이는 무지개 별에서 무얼 하고 있을까요? 일상을 기록하는 햄식이의
          일기장을 슬쩍 엿볼 수 있어요!
        </p>
      </Headtext>
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
  display: flex;
  flex-direction: column;
  width: 1000px;
`;
const Headtext = styled.div`
  margin: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  img {
    width: 100px;
  }
`;
const PictureContainer = styled.div`
  margin: auto;
  padding: 20px;
  width: 300px;
  height: 300px;
  border: 1px solid black;
`;

const TextContainer = styled.div`
  margin: auto;
  padding: 20px;
  width: 300px;
  height: 100px;
  border: 1px solid black;
`;

export default Diary;
