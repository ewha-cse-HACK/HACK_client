import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { styled, css } from "styled-components";
import "./style.css";
import Header from "../components/Header/Header";

function Brand() {
  const navigate = useNavigate();
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const percentage = (window.scrollY / scrollHeight) * 100;
      setScrollPercentage(percentage);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Wallpaper />
      <Wrapper>
        <PageWrapper id="first">
          <TextContainer>
            <h1>
              우리 아이에게 <br />
              보내는 무지개 편지
            </h1>
            <p>
              시간이 흘러도 여전히 그리운 당신의 가족에게 <br />
              전하고 싶은 말을 모아 편지로 직접 보내세요.
            </p>
          </TextContainer>
          <ImgContainer>
            <img src="/images/landing1.png" />
          </ImgContainer>
        </PageWrapper>
        <PageWrapper id="second">
          <ImgContainer>
            <img src="/images/landing2.png" />
          </ImgContainer>
          <TextContainer>
            <h1>
              당신의 반려동물에
              <br />
              대해 알려주세요
            </h1>
            <p>
              무지개 다리 너머로 당신의 편지가 닿을 수 있도록
              <br />
              어떤 놀이를 좋아했는지, 어떤 습관을 가졌는지
              <br />
              가능한 자세히 알려주세요.
            </p>
          </TextContainer>
        </PageWrapper>
        <PageWrapper id="third">
          <TextContainer>
            <h1>
              그리운 마음을 <br />
              솔직하게 털어놓으세요
            </h1>
            <p>
              나와 반려동물만이 존재하는 공간에서
              <br />
              당신의 이야기를 자유롭게 털어놓을 수 있습니다.
            </p>
          </TextContainer>
          <ImgContainer>
            <img src="/images/landing3.png" />
          </ImgContainer>
        </PageWrapper>
        <PageWrapper id="fourth">
          <ImgContainer>
            <img src="/images/landing4.png" />
          </ImgContainer>
          <TextContainer>
            <h1>
              반려동물의 하루를 <br />
              구경해보세요
            </h1>
            <p>
              내가 없는 곳에서 지내는
              <br />
              반려동물의 그림일기를 감상해보세요.
            </p>
          </TextContainer>
        </PageWrapper>
        <PageWrapper id="fifth">
          <TextContainer id="lastBrand">
            <h1>
              같은 일을 겪은 사람들과 <br />
              감정을 공유하세요
            </h1>
            <p>
              커뮤니티에서 반려동물의 사진과 이야기를 공유하세요.
              <br />
              서로의 아픔을 보듬어주며 성장할 수 있어요.
            </p>
            <button id="startBrand" onClick={() => navigate("/pages/Persona")}>
              시작하기
            </button>
          </TextContainer>
          <ImgContainer>
            <img src="/images/landing5.png" />
          </ImgContainer>
        </PageWrapper>
      </Wrapper>
    </>
  );
}

const Wallpaper = styled.div`
  top: 0;
  left: 0;
  z-index: -1;
  position: fixed;
  width: 100vw;
  height: 4000px;
  background-image: url(/images/landingback.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;
const Wrapper = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
`;
const PageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 1120px;
  height: 700px;
  justify-content: center;
  align-items: center;
`;
const ImgContainer = styled.div`
  justify-content: center;
  align-items: center;
`;
const TextContainer = styled.div`
  width: auto;
  margin-bottom: 100px;
  h1 {
    font-size: 45px;
    font-weight: 800;
    margin-bottom: 15px;
  }
  p {
    font-size: 20px;
    font-weight: 300;
  }
`;

export default Brand;
