import React, { useState, useEffect } from "react";
import { useParams, Link, Routes, Route, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import "./style.css";
import { BeatLoader } from "react-spinners";

function Diary() {
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState(""); // 유저의 입력을 저장하는 상태
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { petIdString } = useParams();
  const pet_id = parseInt(petIdString, 10);
  const [journalId, setJournalId] = useState(null);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value); // 입력 값 업데이트
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `https://api.rainbow-letter.com/journal/${pet_id}/image`,
        null, // Request body is null
        {
          headers: {
            "X-ACCESS-TOKEN": `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      console.log("journal_id 타입:", typeof response.data);
      setJournalId(response.data);
    } catch (error) {
      console.error("API 요청 실패:", error);
      // 오류 처리 로직 추가
    } finally {
      setLoading(false);
    }
  };
  const handleGet = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.get(
        `https://api.rainbow-letter.com/journal/${journalId}`,
        null,
        {
          headers: {
            "X-ACCESS-TOKEN": `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("API Get 요청 실패:", error);
      // 오류 처리 로직 추가
    } finally {
      setLoading(false);
    }
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
      <button id="DiaryBtn" onClick={handleSubmit}>
        Send
      </button>
      <button id="DiaryBtn" onClick={handleGet}>
        view
      </button>
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
