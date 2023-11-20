import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";
import "./style.css";
import "./font.css";
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
  const [diaryArray, setDiaryArray] = useState([]);
  const [journalArray, setJournalArray] = useState([]);
  const [createdDate, setCreatedDate] = useState();

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
        console.log(response.data); //Object
        console.log(response.data.journalList); //Just Array
        console.log(response.data.journalList.id); //undefined
        console.log(response.data.journalList.length); //6

        const processedData = response.data.journalList.reduce(
          (result, entry) => {
            const date = entry.createdTime.split("T")[0]; // '2023-11-14'
            const createdMonth = date.split("-")[1]; // 월 정보 추출

            // 중복된 날짜에 대한 인덱스 처리
            let index = 1;
            let uniqueDate = date;

            while (result[uniqueDate]) {
              uniqueDate = `${date} (${index})`;
              index += 1;
            }

            if (result[uniqueDate]) {
              result[uniqueDate].count += 1;
              result[uniqueDate].entries.push({
                id: `${entry.id} (${index})`, // id에 중복 인덱스 추가
                createdTime: uniqueDate,
                createdMonth,
              });
            } else {
              result[uniqueDate] = {
                count: 1,
                entries: [
                  {
                    id: `${entry.id} (${index})`,
                    createdTime: uniqueDate,
                    createdMonth,
                  },
                ],
              };
            }

            /*
            if (result[date]) {
              result[date].count += 1;
              result[date].entries.push({
                id: entry.id,
                createdTime: `${date} (${result[date].count})`,
                createdMonth,
              });
            } else {
              result[date] = {
                count: 1,
                entries: [{ id: entry.id, createdTime: date, createdMonth }],
              };
            }
            */

            return result;
          },
          {}
        );
        setJournalArray(processedData);
        console.log(processedData);
      } catch (error) {
        console.error("그림일기 월별 목록 조회 API 요청 실패:", error);
      }
    };

    fetchData();
  }, [journalId, selectedMonth, pet_id, token]); // journalId가 변경될 때마다 API 요청

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

          {journalArray.length === 0 ? (
            <p>
              {petName}의 일기가 아직 없어요.
              <br />
              아래 버튼을 눌러 새로 만들어볼까요?
            </p>
          ) : (
            <>
              {Object.entries(journalArray).map(([date, data]) => (
                <DiaryShape key={date}>
                  <h5>{date}</h5>
                  {data.entries
                    .filter((entry) => entry.createdMonth === selectedMonth)
                    .map((entry) => (
                      <div key={entry.id}>
                        <p>{entry.createdTime}</p>
                        {/* 기타 원하는 정보 표시 */}
                      </div>
                    ))}
                </DiaryShape>
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
  width: 250px;
  height: 40px;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 10px;
  h5 {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
  }
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
    margin: 5px;
  }
  margin-bottom: 100px;
`;
const BackButton = styled.div`
  margin: 20px;
  margin-bottom: 0;
`;

export default DiaryList;
