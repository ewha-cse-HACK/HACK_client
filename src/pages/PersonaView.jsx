import React, { useState, useEffect } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import "./style.css";
import Loading from "./Loading";
import Profile from "../components/Profile";

function PersonaView() {
  const [personaData, setPersonaData] = useState([]);
  const [listSize, setListSize] = useState(0);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://13.209.173.241:8080/rainbow-letter/persona/list",
          {
            headers: {
              "X-ACCESS-TOKEN": `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("응답 데이터 잘 받았나요?"); // response data 체크!! 나중에 지우기
        console.log(response.data);
        setPersonaData(response.data.personaList);
        setListSize(response.data.listSize);
      } catch (error) {
        console.error("API 요청 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <ViewWrapper>
      {/*<Loading loading={loading.toString()} />*/}
      <div>
        {personaData.map((persona) => (
          <Profile
            key={persona.petId}
            name={persona.name}
            petProfile={persona.petProfile}
            petId={persona.petId}
          />
        ))}
      </div>
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
          {personaData.map((persona) => (
            <li key={persona.petId}>
              <strong>이름:</strong> {persona.name} <br />
              <strong>프로필:</strong> {persona.petProfile} <br />
              <strong>ID:</strong> {persona.petId}
            </li>
          ))}
        </ul>
      </div>
    </ViewWrapper>
  );
}

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

export default PersonaView;
