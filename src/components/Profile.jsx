import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "../pages/style.css";

function Profile() {
  const [speciesName, setSpeciesName] = useState("");
  const [name, setName] = useState(""); // 이름 상태 추가
  /* 이미지 불러오기 - 백엔드 연결하면서 변경 */
  /* 나머지도 변수명 바꾸기 */

  useEffect(() => {
    // 실제로는 여기에서 Axios 또는 fetch를 사용하여 백엔드 API를 호출합니다.
    // 더미 데이터 사용 예시
    setTimeout(() => {
      const dummyData = {
        name: "프로필 이름",
        // 다른 프로필 데이터도 여기에 추가할 수 있음
      };
      setName(dummyData.name);
    }, 1000); // 1초 후에 더미 데이터 받아옴 (실제로는 API 호출 결과를 받아오게 됨)
  }, []); // 빈 배열을 넣어 한 번만 실행되게 함

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
