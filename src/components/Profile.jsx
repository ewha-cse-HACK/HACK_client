import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import "../pages/style.css";

function Profile() {
  const [name, setName] = useState("");
  const [personaList, setPersonaList] = useState([]);
  const [listSize, setListSize] = useState(0);
  const token = localStorage.getItem("token");
  /* 이미지 불러오기 */

  useEffect(() => {
    axios
      .get("http://13.209.173.241:8080/rainbow-letter/persona/list", {
        headers: {
          "X-ACCESS-TOKEN": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // API에서 받아온 데이터를 상태에 저장합니다.
        setPersonaList(response.data.personaList);
        setListSize(response.data.listSize);
      })
      .catch((error) => {
        // 에러 핸들링 로직을 추가할 수 있습니다.
        console.error("Error fetching persona data: ", error);
      });
  }, []); // 빈 배열을 넣어 한 번만 실행되게 합니다.

  return (
    <div id="profileCard">
      <div id="profileImage">
        <img src="/images/momo.jpeg" />
      </div>
      <div id="profileInfo">
        <h3>{name}</h3>
        <StyledLink to="/pages/PersonaEdit">페르소나 편집</StyledLink>
        <div id="buttonContainer">
          <Link to="/pages/Chat">
            <button id="chat" type="submit">
              chat
            </button>
          </Link>
          <Link to="/pages/Diary">
            <button id="diary" type="submit">
              diary
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Profile;

const StyledLink = styled(Link)`
  margin-left: 30px;
  margin-top: 0;
  text-decoration: none;
  color: #343b6e;
  border: none;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    color: black;
    font-weight: 600;
  }
`;

/*
const ImageStyled = styled.img`
  width: 180px;
  height: 190px;
  overflow: hidden;
`;
*/
