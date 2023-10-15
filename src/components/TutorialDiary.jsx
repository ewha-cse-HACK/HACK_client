import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "../pages/style.css";

function TutorialDiary() {
  return (
    <TutorialCard>
      <h4>페르소나란?</h4>
      <p>
        '가상의 인물'로, 무지개 편지에서는 '가상의 반려동물'을 만들 수 있습니다.
        + 버튼을 눌러 내 반려동물의 페르소나를 생성해 보세요!
      </p>
      <br />
      <h4>페르소나를 만들면, 채팅과 일기 훔쳐보기 기능을 사용할 수 있어요!</h4>
      <p>프로필 하단의 버튼을 눌러보세요.</p>
      <br />
      <br />
      <Explanation>
        <img src="/images/talkingcat.png" style={{ width: "90px" }} />
        <p>
          내가 만든 반려동물 페르소나와 대화할 수 있어요. 반려동물에게 하고
          싶었던 말을 전해보세요!
        </p>
      </Explanation>
      <br />
      <Explanation>
        <p>
          반려동물이 무지개별에서 잘 지내고 있을지 궁금할 때는, 오늘은 뭘 했는지
          반려동물의 일기를 슬쩍 볼까요?
        </p>
        <img src="/images/diary_paw.png" style={{ width: "70px" }} />
      </Explanation>
    </TutorialCard>
  );
}

const TutorialCard = styled.div`
  padding: 20px;
  width: 300px;
  height: 436px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 0.5px solid gray;
  color: black;
  h4 {
    margin-bottom: 5px;
  }
  p {
    font-size: 15px;
  }
`;
const Explanation = styled.div`
  display: flex;
  flex-direction: row;
  img {
    margin: 10px;
  }
  p {
    font-size: 15px;
  }
`;

export default TutorialDiary;
