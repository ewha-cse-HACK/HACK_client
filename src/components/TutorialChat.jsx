import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "../pages/style.css";

function TutorialChat() {
  return (
    <TutorialCard>
      <h3 id="tutorialChat">페르소나와 채팅하기</h3>
      <Explanation>
        <img src="/images/talkingcat.png" />
        <p>
          채팅을 전송해보세요. 무지개 별에 편지가 도착하고, 반려동물이 편지를
          보내는 데 시간이 좀 걸릴 수 있어요. 열심히 편지를 배달 중이니 조금만
          기다려 주세요!
        </p>
      </Explanation>
    </TutorialCard>
  );
}

const TutorialCard = styled.div`
  padding: 40px;
  width: 400px;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 3px solid #e9f5ff;
  color: black;
  h3 {
    margin: 30px;
    font-size: 25px;
    color: #1f434e;
  }
`;
const Explanation = styled.div`
  display: flex;
  flex-direction: column;
  img {
    margin: 10px;
    width: 300px;
  }
  p {
    margin: 20px;
    font-size: 18px;
  }
`;

export default TutorialChat;
