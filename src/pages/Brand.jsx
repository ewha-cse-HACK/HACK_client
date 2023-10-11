// 랜딩 페이지
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
} from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import "./style.css";

function Brand() {
  return (
    <>
      <Wrapper>
        <PageWrapper id="first">
          <ImgContainer>
            <img src="/images/landing1.png" />
          </ImgContainer>
          <TextContainer>
            <h1>우리 아이에게 보내는 무지개 편지</h1>
          </TextContainer>
        </PageWrapper>
        <PageWrapper id="second">
          <ImgContainer>
            <img src="/images/landing2.png" />
          </ImgContainer>
          <TextContainer>
            <h1>당신의 반려동물에 대해 알려주세요</h1>
          </TextContainer>
        </PageWrapper>
        <PageWrapper id="third">
          <ImgContainer>
            <img src="/images/landing3.png" />
          </ImgContainer>
          <TextContainer>
            <h1>그리운 마음을 솔직하게 털어놓으세요</h1>
          </TextContainer>
        </PageWrapper>
        <PageWrapper id="fourth">
          <ImgContainer>
            <img src="/images/landing4.png" />
          </ImgContainer>
          <TextContainer>
            <h1>반려동물의 하루를 구경해보세요</h1>
          </TextContainer>
        </PageWrapper>
        <PageWrapper id="landing5">
          <ImgContainer>
            <img src="/images/cat cute.png" />
          </ImgContainer>
          <TextContainer>
            <h1>같은 경험을 가진 사람들과 감정을 공유해보세요</h1>
          </TextContainer>
        </PageWrapper>
      </Wrapper>
    </>
  );
}
/*
const Wallpaper = styled.div`
  margin: 0;
  width: 100vw;
  height: 4833px;
  gap: 300px;
  background: radial-gradient(
    50% 50% at 50% 50%,
    #890048 0%,
    #3a0088 48.44%,
    #3a0088 48.45%,
    #000027 100%
  );
`;*/
const Wrapper = styled.div`
  margin: 100px;
  display: flex;
  flex-direction: column;
  gap: 90px;
  justify-content: center;
  align-items: center;
`;
const PageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 700px;
  justify-content: center;
  align-items: center;
`;
const ImgContainer = styled.div`
  justify-content: center;
  align-items: center;
  img {
    width: 600px;
  }
`;
const TextContainer = styled.div`
  width: 500px;
  justify-content: center;
  align-items: center;
`;

export default Brand;
