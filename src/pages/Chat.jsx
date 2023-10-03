import React, { useState } from "react";
import { useParams, Link, Routes, Route, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import "./style.css";

function Chat() {
  const [messages, setMessages] = useState([]); // 대화 내용을 저장하는 상태
  const [userInput, setUserInput] = useState(""); // 유저의 입력을 저장하는 상태
  const { pet_id } = useParams();

  const handleInputChange = (e) => {
    setUserInput(e.target.value); // 입력 값 업데이트
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 유저의 입력을 대화 내용에 추가
    setMessages([...messages, { text: userInput, type: "user" }]);
    setUserInput(""); // 입력 창 비우기

    try {
      const response = await axios.post(
        "http://13.209.173.241:8080/rainbow-letter/chat/{pet_id}",
        {
          question: userInput,
        }
      );

      setMessages([...messages, { text: response.data.answer, type: "bot" }]);
    } catch (error) {
      console.error("API 요청 실패:", error);
      // 오류 처리 로직 추가
    }
  };

  return (
    <ChatWrapper>
      <ChatContainer>
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message-bubble ${
                message.type === "user" ? "user" : "bot"
              }`}
            >
              {message.text}
            </div>
          ))}
        </div>
        <div id="sender"></div>
      </ChatContainer>
      <InputContainer>
        <input
          id="inputField"
          value={userInput}
          onChange={handleInputChange}
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
const InputContainer = styled.div`
  margin: auto;
  width: 800px;
  margin-top: 30px;
  border-radius: 6px;
  background-color: #d2d3e6;
`;
const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
`;
