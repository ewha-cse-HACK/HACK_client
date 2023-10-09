// 랜딩 페이지
import React, { Component, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
} from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import "./style.css";

function OurStory() {
  return (
    <>
      <Wrapper>
        <h1>랜딩 페이지</h1>
        <p>further....</p>
      </Wrapper>
      <PageWrapper>
        <ImgContainer></ImgContainer>
        <TextContainer></TextContainer>
      </PageWrapper>
    </>
  );
}

const Wrapper = styled.div`
  height: 500px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  text-align: center;
  align-items: center;
  margin: auto 0;
`;
const PageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 500px;
`;
const ImgContainer = styled.div`
  width: 100px;
`;
const TextContainer = styled.div`
  width: 100px;
`;

export default OurStory;
