import React, { useState, useEffect } from "react";
import { useParams, Link, Routes, Route, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import "./style.css";
import Fab from "@mui/material/Fab";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { BounceLoader } from "react-spinners";
import TutorialDiary from "../components/TutorialDiary";

function Diary() {
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [stamp, setStamp] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { petIdString } = useParams();
  const pet_id = parseInt(petIdString, 10);
  const [petName, setPetName] = useState();
  const [petProfile, setPetProfile] = useState();
  const [journalId, setJournalId] = useState(); // 초기 journalId 설정
  const [createdTime, setCreatedTime] = useState();
  const [content, setContent] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [commentContent, setCommentContent] = useState();
  const [commentCreatedTime, setCommentCreatedTime] = useState();
  const [personaData, setPersonaData] = useState([]);
  const [isStampedVisible, setIsStampedVisible] = useState(false);
  const [isSelectStampedVisible, setIsSelectStampedVisible] = useState(false);
  const [selectedStamp, setSelectedStamp] = useState("");

  useEffect(() => {
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
          `https://api.rainbow-letter.com/journal/${journalId}`,
          {
            headers: {
              "X-ACCESS-TOKEN": `Bearer ${token}`,
            },
          }
        );
        console.log("1개 조회 응답 성공");
        console.log(response.data);

        // API 응답에서 journalCommentResponseDto가 있는지 확인 후 값을 설정
        if (response.data.journalCommentResponseDto?.content) {
          setCommentContent(response.data.journalCommentResponseDto.content);
          setCommentCreatedTime(
            new Date(response.data.journalCommentResponseDto.createdTime)
          );
        } else {
          // journalCommentResponseDto가 없는 경우에 대한 처리
          console.log("댓글 데이터가 없습니다.");
          setCommentContent("");
        }
        setCreatedTime(new Date(response.data.createdTime));
        console.log("생성 일시", createdTime);
        setJournalId(response.data.id);
        setContent(response.data.content);
        setImageUrl(response.data.imageUrl);
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

  const handleStampButtonClick = () => {
    setIsStampedVisible(true);
    // 여기서 도장 이미지를 업데이트하거나 다른 작업을 수행할 수 있습니다.
  };

  const handleStampClick = (stampPath) => {
    setIsSelectStampedVisible(true);
    setSelectedStamp(stampPath);
  };

  const handleListClick = async () => {
    try {
      const response = await axios.get(
        `https://api.rainbow-letter.com/journal/${pet_id}/list`,
        null,
        {
          headers: {
            "X-ACCESS-TOKEN": `Bearer ${token}`,
          },
        }
      );
      // 리스트 데이터를 어떻게 활용할지 처리
      console.log("일기 리스트 조회 성공");
    } catch (error) {
      console.error("일기 리스트 조회 API 요청 실패:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `https://api.rainbow-letter.com/journal/${pet_id}/image`,
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

  //오늘 일기 불러오기
  const handleGet = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.get(
        `https://api.rainbow-letter.com/journal/${journalId}`,
        {
          headers: {
            "X-ACCESS-TOKEN": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("오늘 일기 불러오기: ", response.data);

      // API 응답에서 journalCommentResponseDto가 있는지 확인 후 값을 설정
      if (response.data.journalCommentResponseDto?.content) {
        setCommentContent(response.data.journalCommentResponseDto.content);
        setCommentCreatedTime(
          new Date(response.data.journalCommentResponseDto.createdTime)
        );
      } else {
        // journalCommentResponseDto가 없는 경우에 대한 처리
        console.log("댓글 데이터가 없습니다.");
        setCommentContent("");
      }
      setCreatedTime(new Date(response.data.createdTime));
      setContent(response.data.content);
      setJournalId(response.data.id);
      setImageUrl(response.data.imageUrl);
    } catch (error) {
      console.error("API Get 요청 (오늘 일기 불러오기) 실패:", error);
      // 오류 처리 로직 추가
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value); // 입력 값 업데이트
  };

  const handleComment = async (e) => {
    e.preventDefault();

    const inputObj = {
      content: userInput,
    };
    const jsonData = JSON.stringify(inputObj);
    console.log(jsonData);

    try {
      const response = await axios.post(
        `https://api.rainbow-letter.com/journal/comment/${journalId}`,
        jsonData,
        {
          headers: {
            "X-ACCESS-TOKEN": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      console.log(response.data);
      if (response.data === "CREATED") {
        alert("코멘트가 등록되었습니다.");
        setCommentContent(userInput);
        setUserInput("");
      } else {
        console.log("어랏 왜 안 되지");
        console.log(response);
        console.log(response.data);
      }
    } catch (error) {
      console.error("API 요청 실패:", error);
      // 오류 처리 로직 추가
    }
  };

  return (
    <>
      <MenuBar>
        <p>메뉴 바</p>
        <div id="diaryButton">
          <PrevDiary onClick={handlePreviousClick}>&lt; 이전</PrevDiary>
          <NextDiary onClick={handleNextClick}>다음 &gt;</NextDiary>
        </div>
        <DiaryList onClick={handleListClick}>목록보기</DiaryList>
        <DiaryButtonBox>
          <TodayDiary onClick={handleSubmit}>일기 생성하기</TodayDiary>
        </DiaryButtonBox>
        {/*<TodayDiary onClick={handleGet}>오늘 일기 불러오기</TodayDiary>*/}
      </MenuBar>
      <Wrapper>
        <Link to="/pages/Persona">
          <Fab color="gray" aria-label="back">
            <ArrowBackIcon />
          </Fab>
        </Link>
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
        <NoteLayout>
          <PetSide>
            <PetProfile id="diaryHead">
              <img src={petProfile} alt="반려동물의 프로필 사진" />
              <h1>{petName}의 일기</h1>
            </PetProfile>
            <Weather id="diaryHead">
              <img src="https://hack-s3bucket.s3.ap-northeast-2.amazonaws.com/diary_weather.png" />
              <p>무지개별은 오늘도 맑음!</p>
            </Weather>
            <PictureContainer>
              {loading ? (
                <BounceLoader color="#FFA4A1" />
              ) : (
                <img src={imageUrl} />
              )}
            </PictureContainer>
            <TextContainer>
              {content ? <h3>{content}</h3> : <p>아직 일기가 없어요.</p>}
              {isStampedVisible && (
                <Stamped>
                  <img src={selectedStamp} alt="도장 이미지" />
                </Stamped>
              )}
            </TextContainer>
          </PetSide>
          <UserSide>
            <StampContainer>
              <StampLayout>
                <img
                  src="/images/stamp_dog.jpg"
                  onClick={() => handleStampClick("/images/stamp_dog.jpg")}
                />
                <img
                  src="/images/stamp_cat.jpg"
                  onClick={() => handleStampClick("/images/stamp_cat.jpg")}
                />
                <img
                  src="/images/stamp_bird.jpg"
                  onClick={() => handleStampClick("/images/stamp_bird.jpg")}
                />
                <img
                  src="/images/stamp_ham.jpg"
                  onClick={() => handleStampClick("/images/stamp_ham.jpg")}
                />
              </StampLayout>
              <InStamp>
                {isSelectStampedVisible && (
                  <SelectStamped>
                    <img src={selectedStamp} alt="도장 이미지" />
                  </SelectStamped>
                )}
              </InStamp>
              <button onClick={handleStampButtonClick}>
                도장
                <br />
                꾹!
              </button>
            </StampContainer>
            <div>
              <CommentContainer>
                <CommentBubble>
                  <p>{commentContent}</p>
                </CommentBubble>
              </CommentContainer>
              <InputContainer>
                <input
                  id="inputField"
                  value={userInput}
                  onChange={handleInputChange}
                  autoComplete="off"
                  placeholder="코멘트를 입력하세요"
                />
                <button id="sendBtn" onClick={handleComment}>
                  Send
                </button>
              </InputContainer>
            </div>
          </UserSide>
        </NoteLayout>
      </Wrapper>
    </>
  );
}

const MenuBar = styled.div`
  flex-direction: column;
  width: 179px;
  height: 286px;
  position: fixed;
  top: 50%;
  left: 10%;
  transform: translate(0, -50%);
  border-radius: 20px;
  background: var(--001-b-1-e, #001b1e);
  padding: 0 20px;
  button {
    cursor: pointer;
  }
`;
const PrevDiary = styled.button`
  display: flex;
  justify-content: flex-start;
  width: 100px;
  border: none;
  color: white;
  background: none;
  font-size: 15px;
`;
const NextDiary = styled.button`
  display: flex;
  justify-content: flex-end;
  width: 100px;
  border: none;
  color: white;
  background: none;
  font-size: 15px;
`;
const DiaryList = styled.div`
  margin: 10px;
  margin-top: 15px;
  margin-bottom: 140px;
  display: flex;
  align-items: center;
  border: none;
  color: white;
`;
const DiaryButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const TodayDiary = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 140px;
  height: 40px;
  border: none;
  border-radius: 10px;
  background: #e9f5ff;
  font-size: 15px;
  font-weight: bold;
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
  margin-bottom: 100px;
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
    margin: 15px;
    margin-bottom: 10px;
    width: 40px;
    height: 40px;
    overflow: hidden;
    border-radius: 50%;
  }
  h1 {
    font-size: 26px;
  }
`;
const Weather = styled.div`
  margin: 10px;
  margin-top: 0px;
  margin-left: 25px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  img {
    width: 15px;
    margin-right: 5px;
  }
  p {
    font-size: 12px;
  }
`;
const UserSide = styled.div`
  width: 328px;
  height: 415px;
  display: flex;
  flex-direction: column;
  background: #ffdedc;
`;
const StampContainer = styled.div`
  margin: 5px;
  background: white;
  display: flex;
  align-items: center;
  button {
    margin: 10px;
    width: 70px;
    height: 100px;
    border: none;
    border-radius: 10px;
    background: black;
    color: white;
    font-weight: bold;
    font-size: 18px;
  }
`;
const Stamped = styled.div`
  margin: 10px;
  display: flex;
  margin-top: -10px;
  justify-content: flex-end;
  img {
    width: 60px;
    border-radius: 50%;
  }
`;
const InStamp = styled.div`
  width: 100px;
`;
const SelectStamped = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
  }
`;
const StampLayout = styled.div`
  margin: 5px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
`;
const PictureContainer = styled.div`
  margin: 15px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 180px;
  overflow: hidden;
  border: none;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const TextContainer = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  width: 300px;
  h3 {
    margin: 0 10px;
    font-size: 18px;
  }
  p {
    display: flex;
    margin: 20px;
    align-items: center;
  }
`;
const CommentContainer = styled.div`
  margin: 5px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: end;
  width: 318px;
  height: 200px;
`;
const CommentBubble = styled.div`
  width: 95%;
  height: 100px;
  display: flex;
  align-items: center;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  p {
    padding: 20px;
  }
`;
const InputContainer = styled.div`
  margin: 5px;
  width: 318px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  input {
    margin-right: 4px;
    padding-left: 16px;
    border: none;
    border-radius: 5px;
    width: 230px;
    height: 45px;
    font-size: 17px;
    outline: none;
  }
  button {
    margin: 5px;
    width: 80px;
    height: 45px;
    border-radius: 10px;
    border: none;
    background: #ffa4a1;
    font-weight: 600;
    font-size: 15px;
    color: white;
    &:hover {
      background: #e6908f;
    }
  }
`;

export default Diary;
