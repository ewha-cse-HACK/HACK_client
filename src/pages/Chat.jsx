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
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { petIdString } = useParams();
  const pet_id = parseInt(petIdString, 10);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value); // 입력 값 업데이트
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const inputObj = {
      question: userInput,
    };
    const jsonData = JSON.stringify(inputObj);
    console.log(userInput);
    console.log(jsonData);

    try {
      const response = await axios.post(
        `https://api.rainbow-letter.com/chat/${pet_id}`,
        jsonData,
        {
          headers: {
            "X-ACCESS-TOKEN": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      console.log(response.data);

      const botResponse = JSON.stringify(response.data.answer);

      setMessages([
        ...messages,
        { text: userInput, type: "user" },
        { text: botResponse, type: "bot" },
      ]);

      setUserInput("");
    } catch (error) {
      console.error("API 요청 실패:", error);
      // 오류 처리 로직 추가
    } finally {
      setLoading(false);
    }
  };
  /*  const handleKeyDown = (e) => {
    if (e && e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };
  onKeyDown={handleKeyDown}
  */

  return (
    <Wrapper>
      <GoBackBtn onClick={handleGoBack}>&lt;</GoBackBtn>
      <Space>
        {/* 여기에 넣을 채팅창 목록 등의 공간을 미리 잡아놓았으니 업데이트할 것 */}
        <img src="/images/chatCat.jpg" />
      </Space>
      <ChatWrapper>
        <ChatContainer>
          <div className="profile-image">
            <ProfileImage
              src="/images/pf_dog_space.png"
              alt="반려동물 프로필 이미지"
            />
          </div>
          <div className="chat-messages">
            {loading ? (
              <BeatLoader color="#7CBADC" size={15} />
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
            placeholder="메세지를 입력하세요"
          />
          <button id="sendBtn" onClick={handleSubmit}>
            Send
          </button>
        </InputContainer>
      </ChatWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 50px auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 1080px;
`;
const Space = styled.div`
  display: flex;
  width: 250px;
  height: 450px;
  justify-content: flex-end;
  align-items: center;
  img {
    height: 200px;
  }
`;
const ChatWrapper = styled.div`
  margin: 0;
  background-color: #e9f5ff;
`;
const ChatContainer = styled.div`
  width: 400px;
  height: 500px;
`;
const InputContainer = styled.div`
  width: 400px;
`;
const ProfileImage = styled.img`
  margin: 10px;
  width: 50px;
  height: auto;
  /* border-radius: 50%; */
  overflow: hidden;
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
const GoBackBtn = styled.button`
  position: fixed;
  z-index: 1000;
  top: 150px;
  left: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #8bcef4;
  color: white;
  font-size: 25px;
  border: none;
  cursor: pointer;
`;

export default Chat;
