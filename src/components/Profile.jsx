import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "../pages/style.css";

function Profile() {
  const [name] = useState("");
  /* 이미지 불러오기 - 백엔드 연결하면서 변경 */
  /* 나머지도 변수명 바꾸기 */

  return (
    <div id="profileCard">
      <div id="profileImage">
        <img />
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
  text-decoration: none;
  color: #343b6e;
  &:hover {
    color: black;
    font-weight: 500;
  }
`;

/*
const ImageStyled = styled.img`
  width: 180px;
  height: 190px;
  overflow: hidden;
`;
*/
