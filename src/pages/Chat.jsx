import React, { useState, useEffect } from "react";
import { useParams, Link, Routes, Route, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import "./style.css";
import { BeatLoader } from "react-spinners";

function Chat() {
  const [messages, setMessages] = useState([]); // 대화 내용을 저장하는 상태
  const [userInput, setUserInput] = useState(""); // 유저의 입력을 저장하는 상태
  const [loading, setLoading] = useState(false);
  const { pet_id } = useParams();
  const navigate = useNavigate();

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
        "http://13.209.173.241:8080/rainbow-letter/chat/${pet_id}",
        {
          question: userInput,
        }
      );
      console.log(response);
      setMessages([...messages, { text: userInput, type: "user" }]);
      setMessages([...messages, { text: response.data, type: "bot" }]);
      setUserInput(""); // 입력 창 비우기
    } catch (error) {
      console.error("API 요청 실패:", error);
      // 오류 처리 로직 추가
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e && e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <ChatWrapper>
      <GoBackBtn onClick={handleGoBack}>&lt;</GoBackBtn>
      <ChatContainer>
        <div className="profile-image">
          {/* 여기에 프로필 이미지를 넣는 코드를 추가하세요 */}
        </div>
        <div className="chat-messages">
          {loading ? (
            <BeatLoader color="#343B6E" size={15} />
          ) : (
            messages.map((message, index) => (
              <MessageBubble key={index} className={message.type}>
                {message.text}
              </MessageBubble>
            ))
          )}
        </div>
      </ChatContainer>
      <InputContainer>
        <input
          id="inputField"
          value={userInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="메세지를 입력하세요"
        />
        <button id="sendBtn" onClick={handleSubmit}>
          Send
        </button>
      </InputContainer>
    </ChatWrapper>
  );
}

export default Chat;

const ChatWrapper = styled.div`
  margin: auto;
  width: 1000px;
  height: 800px;
  font-family: DMSans;
  font-weight: medium;
  font-size: 15px;
`;
const ChatContainer = styled.div`
  margin: auto;
  padding: 16px;
  width: 800px;
  height: 70%;
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  background-color: #d2d3e6;
`;
const MessageBubble = styled.div`
  margin: 10px;
  padding: 10px;
  max-width: 70%; /* 최대 너비 설정 */
  font-size: 14px; /* 글자 크기 */
  word-wrap: break-word; /* 긴 단어 자동 줄바꿈 */
  background-color: ${(props) =>
    props.type === "user" ? "#4CAF50" : "#008CBA"};
  color: white;
  padding: 10px;
  border-radius: 10px;
  align-self: ${(props) => (props.type === "user" ? "flex-end" : "flex-start")};
`;
const InputContainer = styled.div`
  margin: auto;
  width: 800px;
  height: 60px;
  margin-top: 30px;
  border-radius: 6px;
  background-color: #d2d3e6;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
`;
const GoBackBtn = styled.button`
  position: fixed;
  z-index: 1000;
  top: 170px;
  left: 90px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #6d719b;
  color: white;
  font-size: 25px;
  border: none;
  cursor: pointer;
`;
