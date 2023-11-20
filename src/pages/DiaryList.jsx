import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";
import "./style.css";
// import "./global.css";
import dayjs from "dayjs";
import Fab from "@mui/material/Fab";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { BounceLoader } from "react-spinners";
import TutorialDiary from "../components/TutorialDiary";

function DiaryList() {
  const [loading, setLoading] = useState(false);
  const bookColor = ["#FFF1EF", "#FFD7D5", "#FFBEBB"];
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { petIdString } = useParams();
  const pet_id = parseInt(petIdString, 10);
  const [personaData, setPersonaData] = useState([]);
  const [petName, setPetName] = useState();
  const [petProfile, setPetProfile] = useState();
  const [journalId, setJournalId] = useState();
  const [createdTime, setCreatedTime] = useState();
  const [diaryArray, setDiaryArray] = useState([]);

  const currentMonth = dayjs().month() + 1; // month()는 0부터 시작하므로 +1을 해줌
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

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
          `https://api.rainbow-letter.com/journal/${pet_id}/list/${selectedMonth}`,
          {
            headers: {
              "X-ACCESS-TOKEN": `Bearer ${token}`,
            },
          }
        );
        console.log("그림일기 월별 목록 조회 응답 성공");
        console.log(response.data);
        //setDiaryArray(response.journalList);
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

  const handleMonthClick = (month) => {
    setSelectedMonth(month);
  };

  const handleDiaryClick = async (diary) => {
    try {
      // 여기서 해당 일기의 정보를 불러오는 API 호출
      const diaryDetailResponse = await axios.get(
        `https://api.rainbow-letter.com/journal/${pet_id}/${diary.id}`,
        {
          headers: {
            "X-ACCESS-TOKEN": `Bearer ${token}`,
          },
        }
      );

      // Diary 페이지로 이동하면서 pet_id와 일기 정보를 전달
      navigate(`/pages/Diary/${pet_id}/${diary.id}`, {
        state: {
          pet_id: pet_id,
          journal_id: diary.id,
          diaryDetail: diaryDetailResponse.data, // 일기의 상세 정보를 전달할 수 있음
        },
      });
    } catch (error) {
      console.error("일기 상세 정보 조회 API 요청 실패:", error);
    }
  };

  const handleCreateDiary = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        `https://api.rainbow-letter.com/journal/${pet_id}/image`,
        {
          headers: {
            "X-ACCESS-TOKEN": `Bearer ${token}`,
          },
        }
      );
      console.log("일기 생성 API 호출 성공");
      console.log(response);
      setJournalId(response.data);
      console.log("저널 id: ", journalId);
      const newDiary = {
        id: response.data.journal_id,
        // 기타 원하는 정보 추가
      };

      setDiaryArray((prevStack) => [...prevStack, newDiary]);
    } catch (error) {
      console.error("그림일기 생성 API 요청 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <BackButton>
        <Link to="/pages/Persona">
          <Fab color="gray" aria-label="back">
            <ArrowBackIcon />
          </Fab>
        </Link>
      </BackButton>
      <Headtext>
        <HeadContent>
          <img
            src="https://hack-s3bucket.s3.ap-northeast-2.amazonaws.com/community/writing.PNG"
            style={{ width: "40px" }}
          />
          <h1>{petName}의 일기를 훔쳐볼까요?</h1>
        </HeadContent>
        <p>
          내 반려동물은 무지개 별에서 무얼 하고 있을까요? 일상을 기록하는
          반려동물의 일기장을 슬쩍 엿볼 수 있어요!
        </p>
      </Headtext>
      <br />
      <BodyContent>
        <TutorialDiary />
        <StackedDiary>
          {loading && <BounceLoader color="#FFA4A1" />}

          {diaryArray.length === 0 ? (
            <p>
              {petName}의 일기가 아직 없어요.
              <br />
              아래 버튼을 눌러 새로 만들어볼까요?
            </p>
          ) : (
            <>
              <img src="images/mouse_withcat.png" />
              {diaryArray.map((diaryArray) => (
                <DiaryMarker
                  key={diaryArray.id}
                  onClick={() => handleDiaryClick(diaryArray)}
                >
                  {/* 도형의 디자인 및 위치 조정은 필요에 따라 수정하세요 */}
                  <DiaryShape />
                </DiaryMarker>
              ))}
            </>
          )}
          <CreateDiary onClick={handleCreateDiary}>
            오늘의 일기 생성하기
          </CreateDiary>
        </StackedDiary>
      </BodyContent>

      <br />
      <SelectMonthWrapper>
        <h2>Month: {selectedMonth}</h2>
        <MonthButton>
          {Array.from({ length: 12 }, (_, index) => index + 1).map((month) => (
            <button key={month} onClick={() => handleMonthClick(month)}>
              {month}월
            </button>
          ))}
        </MonthButton>
      </SelectMonthWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  width: 1000px;
  /*
  height: 100vh;*/
`;
const Headtext = styled.div`
  margin: auto;
  margin-bottom: 20px;
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
const BodyContent = styled.div`
  margin: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const StackedDiary = styled.div`
  border: 1px solid black;
  width: 400px;
  min-height: 460px;
  margin: 0;
  margin-left: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    margin: auto;
    margin-bottom: 30px;
    text-align: center;
  }
  border: 1px solid black;
`;
const CreateDiary = styled.button`
  width: 261px;
  height: 47px;
  border: none;
  border-radius: 10px;
  background: var(--ffa-4-a-1, #ffa4a1);
  font-size: 18px;
  color: white;
  cursor: pointer;
  font-weight: 700;
`;
const DiaryMarker = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  border: 1px solid black;
`;

const DiaryShape = styled.div`
  width: 20px;
  height: 20px;
  background-color: #4caf50; /* 원하는 배경색으로 변경 */
  border-radius: 50%;
  border: 1px solid black;
`;

const SelectMonthWrapper = styled.div`
  margin: auto;
  margin-top: 30px;
  text-align: center;
`;
const MonthButton = styled.div`
  margin: 20px 0;
  width: 850px;
  button {
    width: 120px;
    height: 40px;
    font-size: 15px;
    border: none;
    border-radius: 20px;
    margin: 10px;
  }
  margin-bottom: 100px;
`;
const BackButton = styled.div`
  margin: 20px;
  margin-bottom: 0;
`;

export default DiaryList;
