import React, { useState, useEffect } from "react";
import { useParams, Link, Routes, Route, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import "./style.css";
import Fab from "@mui/material/Fab";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { BeatLoader } from "react-spinners";
import TutorialDiary from "../components/TutorialDiary";

function Diary() {
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState(""); // 유저의 입력을 저장하는 상태
  const [stamp, setStamp] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { petIdString } = useParams();
  const pet_id = parseInt(petIdString, 10);
  const [journalId, setJournalId] = useState(1); // 초기 journalId 설정

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://13.209.173.241:8080/journal/${journalId}`,
          {
            headers: {
              "X-ACCESS-TOKEN": `Bearer ${token}`,
            },
          }
        );
        console.log("1개 조회 응답 성공");
        console.log(response.data);
      } catch (error) {
        console.error("1개 조회 API 요청 실패:", error);
      }
    };

    fetchData();
  }, [journalId]); // journalId가 변경될 때마다 API 요청

  const handlePreviousClick = () => {
    setJournalId((prevId) => prevId - 1);
  };

  const handleNextClick = () => {
    setJournalId((prevId) => prevId + 1);
  };

  const handleListClick = async () => {
    try {
      const response = await axios.get(
        `http://13.209.173.241:8080/journal/${pet_id}/list`,
        null,
        {
          headers: {
            "X-ACCESS-TOKEN": `Bearer ${token}`,
          },
        }
      );
      // 리스트 데이터를 어떻게 활용할지 처리
      // 저널 아이디 어떻게 넣어주는??
      console.log("일기 리스트 조회 성공");
    } catch (error) {
      console.error("일기 리스트 조회 API 요청 실패:", error);
    }
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value); // 입력 값 업데이트
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `http://13.209.173.241:8080/journal/${pet_id}/image`,
        null, // Request body is null
        {
          headers: {
            "X-ACCESS-TOKEN": `Bearer ${token}`,
          },
        }
      );
      console.log("일기 생성 API 호출 성공");
      console.log(response.data);
      setJournalId(response.data);
    } catch (error) {
      console.error("API 요청 실패:", error);
      // 오류 처리 로직 추가
    } finally {
      setLoading(false);
    }
  };

  //옛날에 1개 조회 테스트해본 거
  const handleGet = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.get(
        `http://13.209.173.241:8080/journal/${journalId}`,
        {
          headers: {
            "X-ACCESS-TOKEN": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("API Get 요청 실패:", error);
      // 오류 처리 로직 추가
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <MenuBar>
        <p>메뉴 바</p>
        <button onClick={handlePreviousClick}>이전</button>
        <button onClick={handleNextClick}>다음</button>
        <button onClick={handleListClick}>목록보기</button>
        <button onClick={handleSubmit}>일기 생성하기</button>
        <button onClick={handleGet}>오늘 일기 불러오기</button>
      </MenuBar>
      <Wrapper>
        <Link to="/pages/Persona">
          <Fab color="gray" aria-label="back">
            <ArrowBackIcon />
          </Fab>
        </Link>
        <Headtext>
          <HeadContent>
            <img src="/images/writing.png" style={{ width: "40px" }} />
            <h1>햄식이의 일기를 훔쳐볼까요?</h1>
          </HeadContent>
          <p>
            햄식이는 무지개 별에서 무얼 하고 있을까요? 일상을 기록하는 햄식이의
            일기장을 슬쩍 엿볼 수 있어요!
          </p>
        </Headtext>
        <br />
        <NoteLayout>
          <PetSide>
            <PetProfile>
              <img src="/images/pf_cat.png" />
              <h1>고양이의 일기</h1>
            </PetProfile>
            <Weather>
              <p>무지개별은 언제나 맑음!</p>
            </Weather>
            <PictureContainer></PictureContainer>
            <TextContainer></TextContainer>
          </PetSide>
          <UserSide>
            <StampContainer>
              <StampLayout>
                <img src="/images/stamp_dog.jpg" />
                <img src="/images/stamp_cat.jpg" />
                <img src="/images/stamp_bird.jpg" />
                <img src="/images/stamp_ham.jpg" />
              </StampLayout>
              <button>도장 꾹!</button>
            </StampContainer>
            <InputContainer>
              <p>코멘트를 입력하세요.</p>
            </InputContainer>
          </UserSide>
        </NoteLayout>
      </Wrapper>
    </>
  );
}

const MenuBar = styled.div`
  width: 179px;
  height: 286px;
  flex-shrink: 0;
  position: fixed;
  top: 50%;
  left: 0;
  transform: translate(0, -50%);
  border-radius: 20px;
  background: var(--001-b-1-e, #001b1e);
  padding: 20px;
`;

const Wrapper = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  width: 1000px;
`;
const Headtext = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`;
const HeadContent = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
`;
const NoteLayout = styled.div`
  margin: 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const PetSide = styled.div`
  width: 328px;
  height: 415px;
  background-image: url(/images/grid_pink.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;
const PetProfile = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  img {
    margin: 10px;
    width: 40px;
    border-radius: 50%;
  }
`;
const Weather = styled.div`
  margin: 15px;
  margin-top: 0px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const UserSide = styled.div`
  width: 328px;
  height: 415px;
  display: flex;
  flex-direction: column;
  background: #ffdedc;
`;
const StampContainer = styled.div`
  display: flex;
  button {
    margin: 10px;
    width: 70px;
    border: none;
    border-radius: 50px;
    background: black;
    color: white;
  }
`;
const StampLayout = styled.div`
  margin: 10px;
  img {
    width: 50px;
    border-radius: 50%;
  }
`;
const PictureContainer = styled.div`
  margin: auto;
  padding: 20px;
  width: 100px;
  height: 100px;
  border: 1px solid black;
`;

const TextContainer = styled.div`
  margin: auto;
  padding: 20px;
  width: 300px;
  height: 100px;
  border: 1px solid black;
`;
const InputContainer = styled.div`
  width: 200px;
`;

export default Diary;
