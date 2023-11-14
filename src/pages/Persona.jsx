import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

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
          setPersonaData(response.data.personaList);
          setListSize(response.data.listSize);
        } catch (error) {
          console.error("API 요청 실패:", error);
        }
      } else {
        setPersonaData([]);
        alert("로그인이 필요합니다.");
        navigate("/pages/Login");
      }
    };
    fetchData();
  }, [token]);

  return (
    <ViewWrapper>
      <TutorialPersona />
      <ProfilesContainer single={listSize === 1}>
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
  min-height: 70vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 80px;
`;
/*
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  justify-content: center;
*/
const ProfilesContainer = styled.div`
  margin-left: 40px;
  gap: 80px;
  display: grid;
  grid-template-columns: ${({ single }) => (single ? "1fr" : "repeat(2, 1fr)")};
  justify-content: center;
`;
const AddContainer = styled.div`
  margin: 0 50px;
`;
export default Persona;

/*

ProfilesContainer의 레이아웃을 동적으로 변경하려면 JavaScript를 사용하여 조건부 스타일을 적용할 수 있습니다. 이를 위해 personaData 배열의 길이를 확인하고 그에 따라 스타일을 지정할 수 있습니다.

아래는 이에 대한 예시 코드입니다:

jsx
Copy code
const Persona = () => {
  // ... 이전 코드

  const isGrid = personaData.length >= 3;

  return (
    <ViewWrapper>

      <ProfilesContainer isGrid={isGrid}>
        {personaData.map((persona) => (
          <Profile
            key={persona.petId}
            name={persona.name}
            petProfile={persona.petProfile}
            petId={persona.petId}
          />
        ))}
      </ProfilesContainer>

    </ViewWrapper>
  );
};

const ProfilesContainer = styled.div`
  gap: 80px;
  ${({ isGrid }) =>
    isGrid
      ? `
        display: grid;
        grid-template-columns: 1fr 1fr;
      `
      : `
        display: flex;
        justify-content: center;
      `}
`;

export default Persona;
이 예시에서는 isGrid라는 변수를 설정하여 personaData의 길이에 따라 ProfilesContainer의 레이아웃이 동적으로 변경되도록 했습니다. isGrid가 true이면 grid 레이아웃이, false이면 flex 레이아웃이 적용됩니다.


*/
