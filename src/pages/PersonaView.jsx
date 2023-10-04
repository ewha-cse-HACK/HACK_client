import React, { useState, useEffect } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import "./style.css";
import Profile from "../components/Profile";

function PersonaView() {
  const [personaList, setPersonaList] = useState([]);
  const [listSize, setListSize] = useState(0);
  const token = localStorage.getItem("token");

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
    <ViewWrapper>
      <Profile />
      <div id="addContainer">
        <Link to="/pages/PersonaSetting">
          <button id="addPersona" type="submit">
            +
          </button>
        </Link>
      </div>

      <div id="outputTest">
        <h2>페르소나 리스트</h2>
        <p>페르소나 개수: {listSize}</p>
        <ul>
          {personaList.map((persona) => (
            <li key={persona.petId}>
              <strong>이름:</strong> {persona.name} <br />
              <strong>프로필:</strong> {persona.petProfile} <br />
              <strong>ID:</strong> {persona.petId}
            </li>
          ))}
        </ul>
      </div>
    </ViewWrapper>
    /* 로그인 id체크하고 거기서 페르소나 생성된 거 있는지 체크, 
    true면 페르소나 불러와서 프로필 - 근데 여기서 변수 하나하나 이어줘야 함
    그리고 만약 페르소나 여러 개면 레이아웃 짜주고 간격은 동일하게 유지
    한 화면에 세 개 맥스, 그 이상은 화살표로 이어주기. (일단은 하나 있는 것만 하기) */
  );
}

export default PersonaView;

/* height 나중에 브라우저 크기로 변경, 화살표로 넘기는 액션 추가 */
const ViewWrapper = styled.div`
  margin: 70px auto;
  width: 1000px;
  height: 400px;
  display: flex;
  justify-content: center;
  gap: 120px;
  align-items: center;
`;
