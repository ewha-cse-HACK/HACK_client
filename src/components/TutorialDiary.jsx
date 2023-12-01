import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "../pages/style.css";

function TutorialDiary() {
  return (
    <TutorialCard>
      <h4>반려동물의 일기</h4>
      <p>
        무지개별에서 일기를 꾸준히 썼대요!
        <br />
        쌓여있는 책 중 하나를 클릭해서
        <br />
        어떤 내용인지 볼 수 있어요.
      </p>
      <br /> <br />
      <Explanation>
        <img src="/images/books.png" />
        <TextExplanation>
          <h5>💌일기 훔쳐보기 사용 방법📚</h5>
          <br />
          <p>
            1. '오늘의 일기 가져오기' 버튼을 <br />
            누르면 일기가 생성돼요.
            <br />
            2. 날짜별로 저장된 일기를 클릭 <br />
            하고, 일기에 도장을 찍어주고 <br />
            코멘트를 남길 수 있어요! <br />
          </p>
        </TextExplanation>
      </Explanation>
      <h5>
        무지개 다리를 건너오기 때문에 <br />
        일기를 가져오는 데 시간이 걸릴 수도
        <br /> 있어요. 조금만 기다려주세요! <br />
      </h5>
    </TutorialCard>
  );
}

const TutorialCard = styled.div`
  margin: 10px;
  padding: 10px;
  width: 370px;
  height: 460px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  border: 3px solid var(--secondary-color, #ffa4a1);
  color: black;
  h4 {
    margin: 0 auto;
    margin-bottom: 5px;
    font-size: 25px;
  }
  h5 {
    font-size: 18px;
  }
  p {
    margin: 0 auto;
    font-size: 15px;
  }
`;
const Explanation = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
  img {
    width: 120px;
    height: 144.38px;
    margin-right: -30px;
  }
`;
const TextExplanation = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  h5 {
    font-size: 18px;
  }
`;

export default TutorialDiary;
