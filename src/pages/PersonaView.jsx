import React, { useState } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import "./style.css";
import Profile from "../components/Profile";

function PersonaView() {
  return (
    <ViewWrapper>
      <div id="addContainer">
        <Link to="/pages/PersonaSetting">
          <button id="addPersona" type="submit">
            +
          </button>
        </Link>
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
  height: 300px;
  display: flex;
  justify-content: center;
  gap: 120px;
  align-items: center;
`;
