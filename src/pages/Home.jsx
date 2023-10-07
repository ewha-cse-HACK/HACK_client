import React, { useState } from "react";
import styled from "styled-components";

function Home() {
  const [speciesName, setSpeciesName] = useState("");
  const [base64String, setBaseString] = useState("");

  return (
    <HomeWrapper>
      <br />
      <ImageStyled src="/images/letter2.jpg" alt="무지개 편지를 소개합니다!" />
      <br />
      <br />
      <h1>무지개 편지</h1>
      <br />
      <h3>
        세상을 떠난 그리운 가족-나의 친구, 나의 동생, 나의 자식인 반려동물에게
        보내는 편지
      </h3>
      <br />
      <h3>당신의 가족에게 편지를 보낼 수 있는 서비스, 무지개 편지입니다.</h3>
      <br />
      <h5>-배달부 일동-</h5>
      <br />
    </HomeWrapper>
  );
}

const HomeWrapper = styled.div`
  margin: auto;
  padding: 50px;
  width: 1000px;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ImageStyled = styled.img`
  max-width: 40%;
  height: auto;
`;

export default Home;
