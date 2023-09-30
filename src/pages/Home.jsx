import React, { Component } from "react";
import styled from "styled-components";

class Home extends Component {
  render() {
    return (
      <HomeWrapper>
        <br />
        <ImageStyled
          src="/images/letter2.jpg"
          alt="무지개 편지를 소개합니다!"
        />
        <br />
        <h1>무지개 편지</h1>
        <br />
        <h3>
          세상을 떠난 그리운 가족-나의 친구, 나의 동생, 나의 자식인 반려동물에게
          보내는 편지
        </h3>
        <br />
      </HomeWrapper>
    );
  }
}

const HomeWrapper = styled.div`
  margin: auto;
  padding: 50px;
  width: 1000px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ImageStyled = styled.img`
  max-width: 20%;
  height: auto;
`;

export default Home;
