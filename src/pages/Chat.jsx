import React, { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import "./style.css";
import Fab from "@mui/material/Fab";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { BeatLoader } from "react-spinners";
import TutorialChat from "../components/TutorialChat";

function Chat() {
  //const [userMessage, setUserMessage] = useState([]); // 대화 내용
  //const [petMessage, setPetMessage] = useState([]); // 대화 내용
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const { petIdString } = useParams();
  const pet_id = parseInt(petIdString, 10);
  const [petName, setPetName] = useState();
  const [petProfile, setPetProfile] = useState();
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          const response = await axios.get(
            "https://api.rainbow-letter.com/persona/list",
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
            setPetName(name);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userInput.trim() === "") return;
    setMessages([...messages, { text: userInput, isUser: true }]);
    setUserInput("");
    setLoading(true);
    await fetchBotResponse(userInput);
  };

  const fetchBotResponse = async (userMessage) => {
    const inputObj = {
      question: userMessage,
    };
    const jsonData = JSON.stringify(inputObj);
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
      const data = response.data;

      // 온점(.) 이전의 부분만 추출
      const trimmedResponse = data.answer
        .split(".")
        .slice(0, -1)
        .join(".")
        .trim();

      // 챗봇의 응답을 메시지 목록에 추가하고 로딩 상태 업데이트
      setMessages([
        ...messages,
        { text: userMessage, isUser: true },
        { text: trimmedResponse, isUser: false },
      ]);
      setLoading(false);
    } catch (error) {
      console.error("GPT API 호출 오류:", error);
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <BackButton>
        <Link to="/pages/Persona">
          <Fab color="gray" aria-label="back">
            <ArrowBackIcon />
          </Fab>
        </Link>
      </BackButton>
      <HeadText>
        <h1 id="chatHeadText">{petName}하고 채팅하기</h1>
      </HeadText>
      <NextWrapper>
        <TutorialChat />
        <ChatWrapper>
          <ChatContainer ref={chatContainerRef}>
            <div className="chat-messages">
              {messages.map((message, index) => (
                <MessageContainer key={index} isUser={message.isUser}>
                  {!message.isUser && (
                    <ProfileImage src={petProfile} alt="Pet Profile" />
                  )}
                  <MessageText isUser={message.isUser}>
                    {message.text}
                  </MessageText>
                </MessageContainer>
              ))}
              {loading && (
                <div className="message-bot">
                  <LoadingDesign>
                    <BeatLoader size={15} color="#8BCEF4" />
                  </LoadingDesign>
                </div>
              )}
            </div>
          </ChatContainer>
          <InputContainer>
            <form className="chat-input-form" onSubmit={handleSubmit}>
              <input
                id="inputField"
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                autoComplete="off"
                placeholder="메세지를 입력하세요"
              />
              <button id="sendBtn" type="submit">
                Send
              </button>
            </form>
          </InputContainer>
        </ChatWrapper>
      </NextWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 20px auto;
  margin-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 1080px;
`;
const NextWrapper = styled.div`
  margin: 30px auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 1080px;
  gap: 50px;
`;
const HeadText = styled.div`
  margin: 30px;
  margin-top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1080px;
`;
const ChatWrapper = styled.div`
  margin: 0;
  width: 400px;
  height: 600px;
  background-color: #e9f5ff;
`;
const ChatContainer = styled.div`
  width: 100%;
  height: 543px;
  overflow-y: auto;
`;
const LoadingDesign = styled.div`
  display: flex;
  justify-content: center;
`;
const ProfileImage = styled.img`
  margin: 10px;
  width: 60px;
  height: auto;
  border-radius: 50%;
  overflow: hidden;
`;
const MessageContainer = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.isUser ? "row-reverse" : "row")};
  align-items: flex-start;
  margin-bottom: 10px;
`;

const MessageText = styled.div`
  margin: 10px;
  border-radius: 10px;
  max-width: 70%;
  font-size: 15px;
  word-wrap: break-word;
  padding: 20px;
  background: ${(props) => (props.isUser ? "white" : "#bae2fa")};
`;
const InputContainer = styled.div`
  background: #bae2fa;
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
  margin-bottom: 0;
`;

export default Chat;
