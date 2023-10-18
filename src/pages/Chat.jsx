import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import "./style.css";
import Fab from "@mui/material/Fab";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { BeatLoader } from "react-spinners";
import TutorialChat from "../components/TutorialChat";

function Chat() {
  const [userMessage, setUserMessage] = useState([]); // 대화 내용
  const [petMessage, setPetMessage] = useState([]); // 대화 내용
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState(""); // 유저 입력
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { petIdString } = useParams();
  const pet_id = parseInt(petIdString, 10);
  const [petName, setPetName] = useState();
  const [petProfile, setPetProfile] = useState();

  useEffect(() => {
    const fetchData = async () => {
      // https://api.rainbow-letter.com/persona/list
      if (token) {
        try {
          const response = await axios.get(
            "http://13.209.173.241:8080/persona/list",
            {
              headers: {
                "X-ACCESS-TOKEN": `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          console.log(response.data);

          const matchingPersona = response.data.personaList.find(
            (persona) => persona.petId === pet_id
          );

          if (matchingPersona) {
            const { name, petProfile } = matchingPersona;
            console.log(name, petProfile);
            setPetName(name); // petName 변수 업데이트
            setPetProfile(petProfile);
          } else {
            // 일치하는 petId를 찾지 못한 경우에 대한 처리
            console.log("일치하는 petId를 찾을 수 없습니다.");
          }
        } catch (error) {
          console.error("API 요청 실패:", error);
        }
      } else {
        alert("로그인이 필요합니다.");
      }
    };
    fetchData();
  }, [token]);

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
    console.log(jsonData);

    try {
      const response = await axios.post(
        `http://13.209.173.241:8080/chat/${pet_id}`,
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

      setUserMessage(userInput);
      setPetMessage(response.data.answer);

      const newMessages = response.data.messages; // 엑시오스 요청으로 받아온 메시지 데이터
      //setMessages([...messages, ...newMessages]); // 이전 메시지와 새로 받아온 메시지를 합쳐 업데이트

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
    <>
      {/*
        <div>
        {messages.map((message, index) => (
        <div key={index}>{message.text}</div>
      ))}
    </div>
    */}
      <BackButton>
        <Link to="/pages/Persona">
          <Fab color="gray" aria-label="back">
            <ArrowBackIcon />
          </Fab>
        </Link>
      </BackButton>
      <Wrapper>
        <TutorialChat />

        <ChatWrapper>
          <ChatContainer>
            <ReceiverSide>
              <ProfileImage
                src="/images/pf_dog.png"
                alt="반려동물 프로필 이미지"
              />
              <PetBubble>{petMessage}</PetBubble>
            </ReceiverSide>
            <SenderSide>
              <UserBubble>ddd</UserBubble>
            </SenderSide>
            <ReceiverSide>
              <ProfileImage
                src="/images/pf_dog.png"
                alt="반려동물 프로필 이미지"
              />
              <PetBubble>{petMessage}</PetBubble>
            </ReceiverSide>
            <SenderSide>
              <UserBubble>ddd</UserBubble>
            </SenderSide>
          </ChatContainer>
          <InputContainer>
            <input
              id="inputField"
              value={userInput}
              onChange={handleInputChange}
              autoComplete="off"
              placeholder="메세지를 입력하세요"
            />
            <button id="sendBtn" onClick={handleSubmit}>
              Send
            </button>
          </InputContainer>
        </ChatWrapper>
      </Wrapper>
    </>
  );
}
const Wrapper = styled.div`
  margin: 50px auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 1080px;
`;
const ChatWrapper = styled.div`
  margin: 0;
  background-color: #e9f5ff;
`;
const ChatContainer = styled.div`
  width: 400px;
  height: 500px;
`;
const ReceiverSide = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;
const SenderSide = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const MessageBubble = styled.div`
  background-color: ${(props) =>
    props.type === "user" ? "#4CAF50" : "#008CBA"};
  align-self: ${(props) => (props.type === "user" ? "flex-end" : "flex-start")};
`;
const ProfileImage = styled.img`
  margin: 10px;
  width: 70px;
  height: auto;
  border-radius: 50%;
  overflow: hidden;
`;
const PetBubble = styled.div`
  margin: 10px;
  border-radius: 10px;
  max-width: 70%;
  font-size: 14px;
  word-wrap: break-word;
  padding: 20px;
  background: #bae2fa;
`;
const UserBubble = styled.div`
  margin: 10px;
  border-radius: 10px;
  max-width: 70%;
  font-size: 14px;
  word-wrap: break-word;
  padding: 20px;
  background: white;
`;
const InputContainer = styled.div`
  height: 100px;
  justify-content: bottom;
  input {
    margin: 5px;
    padding-left: 16px;
    border: none;
    width: 300px;
    height: 45px;
    font-size: 17px;
    outline: none;
  }
  button {
    margin: 5px;
    width: 80px;
    height: 43px;
    border-radius: 10px;
    border: none;
    background: #8bcef4;
    font-weight: 600;
    font-size: 15px;
    color: white;
    &:hover {
      background: #7cbadc;
    }
  }
`;

const BackButton = styled.div`
  margin: 30px;
`;

export default Chat;
