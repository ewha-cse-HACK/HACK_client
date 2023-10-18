import React, { useState, useEffect } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import "./style.css";
// import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Profile from "../components/Profile";
import TutorialPersona from "../components/TutorialPersona";

function Persona() {
  const [personaData, setPersonaData] = useState([]);
  const [listSize, setListSize] = useState(0);
  const token = localStorage.getItem("token");

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
          setPersonaData(response.data.personaList);
          setListSize(response.data.listSize);
        } catch (error) {
          console.error("API 요청 실패:", error);
        }
      } else {
        setPersonaData([]);
        alert("로그인이 필요합니다.");
      }
    };
    fetchData();
  }, [token]);

  const settings = {
    arrows: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    cssEase: "linear",
    // autoplay: true, // 슬라이드를 자동으로 넘길지 여부
    // autoplaySpeed: 3000, // 자동으로 넘길 시 시간 간격
  };

  return (
    <ViewWrapper>
      <TutorialPersona />
      {/*
      <Slider {...settings}>
        {personaData.map((persona) => (
          <Profile
            key={persona.petId}
            name={persona.name}
            petProfile={persona.petProfile}
            petId={persona.petId}
          />
        ))}
      </Slider>*/}
      <ProfilesContainer>
        {personaData.map((persona) => (
          <Profile
            key={persona.petId}
            name={persona.name}
            petProfile={persona.petProfile}
            petId={persona.petId}
          />
        ))}
      </ProfilesContainer>
      <AddContainer>
        <Link to="/pages/persona/PersonaSetting">
          <Fab color="black" aria-label="add">
            <AddIcon />
          </Fab>
        </Link>
      </AddContainer>
    </ViewWrapper>
  );
}

/* height 나중에 브라우저 크기로 변경, 화살표로 넘기는 액션 추가 */
const ViewWrapper = styled.div`
  margin: 70px auto;
  width: 1400px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 80px;
`;
/*
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(700px, 1fr));
  justify-content: center;
*/
const ProfilesContainer = styled.div`
  gap: 80px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  /*max-width: 400px;*/
`;
const AddContainer = styled.div`
  margin: 0 50px;
`;
const SlideItem = styled.div`
  width: 200px;
  heigth: 300px;
  background: blue;
`;
export default Persona;
