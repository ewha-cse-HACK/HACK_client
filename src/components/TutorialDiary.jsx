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
          <p>
            1. 일기는 날짜별로 쌓여 있어요. <br />
            2. 같은 날 여러 개 생성되면 번호가
            <br />
            붙어요. <br />
            3. ‘오늘의 일기 가져오기’ 버튼을 누<br />
            르면 오늘 날짜의 일기가 생성돼요. <br />
            4. 무지개 다리를 건너 가져오기 때<br />
            문에 일기를 가져오는 데 시간이 걸릴
            <br /> 수도 있어요. 조금만 기다려주세요! <br />
            5. 날짜를 클릭해서 그림일기를 읽고,
            <br /> 도장을 찍어 검사해주세요! <br />
            6. 코멘트를 저장할 수 있어요. <br />
            칭찬을 적어 보내주세요! <br />
          </p>
        </TextExplanation>
      </Explanation>
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
  border: 3px solid var(--secondary-color, #ffa4a1);
  color: black;
  h4 {
    margin: 0 auto;
    margin-bottom: 5px;
    font-size: 25px;
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
  img {
    margin-top: 80px;
    width: 120px;
    height: 144.38px;
  }
`;
const TextExplanation = styled.div`
  display: flex;
  flex-direction: column;
  h5 {
    font-size: 15px;
  }
`;

export default TutorialDiary;
