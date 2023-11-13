import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { styled, css } from "styled-components";
import "./style.css";

function Brand() {
  const navigate = useNavigate();
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowTopButton(true);
      } else {
        setShowTopButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    const targetElement = document.getElementById("targetElement");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <ProjectInfo>
        <img
          src="https://hack-s3bucket.s3.ap-northeast-2.amazonaws.com/frontend/logo.png"
          alt="Rainbow letter Logo"
          onClick={handleScroll}
        />
        <h1>펫로스 증후군 극복 프로젝트, 무지개편지</h1>
        <p>로고를 클릭하세요!</p>
      </ProjectInfo>
      <GradientBackground />
      <Content>
        <img src="https://hack-s3bucket.s3.ap-northeast-2.amazonaws.com/frontend/rocket.png" />
      </Content>
      <Wallpaper id="targetElement">
        <Wrapper>
          <PageWrapper id="first">
            <TextContainer style={{ marginBottom: "80px" }}>
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
              <img
                src="/images/landing1.png"
                style={{ width: "250px", marginLeft: "100px" }}
              />
            </ImgContainer>
          </PageWrapper>
          <PageWrapper id="second">
            <ImgContainer>
              <img
                src="/images/landing2.png"
                style={{ width: "280px", marginRight: "100px" }}
              />
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
              <img
                src="/images/landing3.png"
                style={{ width: "270px", marginLeft: "100px" }}
              />
            </ImgContainer>
          </PageWrapper>
          <PageWrapper id="fourth">
            <ImgContainer>
              <img
                src="/images/landing4.png"
                style={{ width: "280px", marginRight: "100px" }}
              />
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
              <button
                id="startBrand"
                onClick={() => navigate("/pages/Persona")}
              >
                시작하기
              </button>
            </TextContainer>
            <ImgContainer>
              <img src="/images/landing5.png" style={{ height: "300px" }} />
            </ImgContainer>
          </PageWrapper>
          <div className="scroll-buttons">
            {showTopButton && (
              <button className="top-button" onClick={scrollToTop}>
                Top
              </button>
            )}
          </div>
        </Wrapper>
      </Wallpaper>
      <div className="scroll-buttons">
        {showTopButton && (
          <button className="top-button" onClick={scrollToTop}>
            Top
          </button>
        )}
      </div>
    </>
  );
}

const Wallpaper = styled.div`
  margin: 0;
  width: 100vw;
  height: 4833px;
  background-image: url(/images/landingback.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;
const ProjectInfo = styled.div`
  height: 100vh;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    color: black;
    margin-top: 40px;
    margin-bottom: 20px;
  }
  p {
    color: #000027;
    font-size: 18px;
  }
  img {
    width: 100px;
    height: auto;
    border-radius: 10px;
    cursor: pointer;
    filter: drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.25));
  }
`;
const GradientBackground = styled.div`
  height: 600px;
  background: linear-gradient(
      180deg,
      #fff 0%,
      #f5f5f5 10%,
      #b2b2b2 30%,
      #5a5a73 50%,
      #000027 80%,
      #000027 95%
    ),
    #fff;
  margin-bottom: -1px;
`;
const Content = styled.div`
  padding: 50px 0;
  height: 500px;
  text-align: center;
  font-size: 24px;
  color: white;
  background-color: #000027;
  margin-bottom: -22px;
  img {
    width: 350px;
  }
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
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 35px;
    font-weight: 800;
    margin-bottom: 15px;
  }
  p {
    font-size: 18px;
    font-weight: 300;
  }
`;
/* 
그라데이션으로 바꾸기 전

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
const TextContainer = styled.div`
  width: auto;
  margin-bottom: 100px;
`;
*/

export default Brand;
