import React, { useState } from "react";
// import { Link, Routes, Route, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
// import "./style.css";

function PersonaSetting() {
  const [petName, setPetName] = useState("");
  const [personality, setPersonality] = useState("");
  const [sender, setSender] = useState("");
  const [favoriteGame, setFavoriteGame] = useState("");
  const [date, setDate] = useState("");
  const [photo, setPhoto] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("petName", petName);
      formData.append("personality", personality);
      formData.append("sender", sender);
      formData.append("favoriteGame", favoriteGame);
      formData.append("date", date);
      formData.append("photo", photo);

      const response = await axios.post("/api/pet", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data); // 서버 응답 확인
      // 성공적으로 저장된 경우, 리다이렉트 또는 다른 작업 수행
    } catch (error) {
      console.error("데이터 저장 오류:", error);
      // 오류 처리 로직 추가
    }
  };

  return (
    <SettingWrapper>
      <div id="send-letter">
        <h1>지금부터 무지개 다리 너머로 편지를 보내볼까요?</h1>
        <ImageStyled src="/images/letter1.png" />
        <h2>편지를 받을 당신의 동물에 대해 알려주세요.</h2>
        <h5>
          앞으로 몇 가지 질문을 통해 누구에게 편지를 보낼지 알아볼 거예요,
        </h5>
        <h5>당신의 편지를 기다리고 있을 가족을 위해 힘내서 만들어 보아요!</h5>
        <button
          id="go-create"
          type="button"
          onclick="location.href='ps-create.html'"
        >
          페르소나 설정 시작!
        </button>
      </div>

      <form></form>
    </SettingWrapper>
  );
}

export default PersonaSetting;

const SettingWrapper = styled.div`
  margin: 30px;
  width: 1000px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
const ImageStyled = styled.img`
  margin: 20px;
  max-width: 40%;
  height: auto;
`;
