import React, { useState, useEffect } from "react";
import { useParams, Link, Routes, Route, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import "./style.css";
import dayjs from "dayjs";
import Fab from "@mui/material/Fab";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { BounceLoader } from "react-spinners";
import TutorialDiary from "../components/TutorialDiary";

function DiaryList() {
  const bookColor = ["#FFF1EF", "#FFD7D5", "#FFBEBB"];
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { petIdString } = useParams();
  const pet_id = parseInt(petIdString, 10);
  const [personaData, setPersonaData] = useState([]);
  const [petName, setPetName] = useState();
  const [petProfile, setPetProfile] = useState();
  const [journalId, setJournalId] = useState(); // 초기 journalId 설정
  const [createdTime, setCreatedTime] = useState();

  const currentDate = dayjs();
  console.log(currentDate.format("YYYY-MM-DD"));
  const currentMonth = dayjs().month() + 1; // month()는 0부터 시작하므로 +1을 해줌
  console.log(currentMonth); // 현재 월을 나타내는 숫자 출력

  const [selectedMonth, setSelectedMonth] = useState();

  useEffect(() => {
    console.log("useEffect is triggered");
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

          const matchingPersona = response.data.personaList.find(
            (persona) => persona.petId === pet_id
          );

          if (matchingPersona) {
            const { name, petProfile } = matchingPersona;
            console.log(name, petProfile);
            setPetName(name); // petName 변수 업데이트
            setPetProfile(petProfile);
          } else {
            // 일치하는 petId를 찾지 못한 경우에 대한 처리
            console.log("일치하는 petId를 찾을 수 없습니다.");
          }
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.rainbow-letter.com/journal/${pet_id}/list/${currentMonth}`,
          {
            headers: {
              "X-ACCESS-TOKEN": `Bearer ${token}`,
            },
          }
        );
        console.log("그림일기 월별 목록 조회 응답 성공");
        console.log(response.data);
        /*
        setCreatedTime(new Date(response.data.createdTime));
        console.log("생성 일시", createdTime);
        setJournalId(response.data.id);
        */
      } catch (error) {
        console.error("그림일기 월별 목록 조회 API 요청 실패:", error);
      }
    };

    fetchData();
  }, [journalId]); // journalId가 변경될 때마다 API 요청

  return (
    <Wrapper>
      <TutorialDiary />
      <h1>책장</h1>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 1200px;
  height: 100vh;
`;

export default DiaryList;
