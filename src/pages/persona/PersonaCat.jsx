import React, { useState } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import styled from "styled-components";
import axios from "axios";
import "../style.css";
import Finished from "../../components/Persona/Finished";

function PersonaCat() {
  const speciesName = "고양이";
  const [name, setName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [charOne, setCharOne] = useState(null);
  const [charTwo, setCharTwo] = useState(null);
  const [favoritePlay, setFavoritePlay] = useState(null);
  const [customPlay, setCustomPlay] = useState(null);
  const [favoriteSnack, setFavoriteSnack] = useState(null);
  const [favoriteTime, setFavoriteTime] = useState(null);
  const [habit, setHabit] = useState(null);
  const [favoritePlace, setFavoritePlace] = useState(null);
  const [routine, setRoutine] = useState(null);
  const [petPhoto, setPetPhoto] = useState(null);
  const [passed_date, setPassedDate] = useState(null);
  const [furColor, setFurColor] = useState(null);
  const [kind, setKind] = useState(null);

  const [showTopButton, setShowTopButton] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // 선택한 파일
    const reader = new FileReader();
    reader.onloadend = () => {
      // 파일을 읽고 이미지 URL을 상태에 저장
      setPetPhoto(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file); // 파일을 data URL로 읽기
    }
  };

  const handleFileChange = (event) => {
    setPetPhoto(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      if (!petPhoto) {
        alert("사진을 선택해주세요.");
        return;
      }

      const formData = new FormData();
      formData.append("petPhoto", petPhoto);

      // 이미지를 업로드할 API 엔드포인트 URL을 입력하세요.
      const apiUrl = "http://example.com/upload";

      // 이미지를 백엔드 서버로 전송
      const response = await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // 업로드 성공 시 처리
      console.log("이미지 업로드 성공!", response.data);
    } catch (error) {
      // 업로드 실패 시 처리
      console.error("이미지 업로드 실패:", error);
    }
  };

  // 이전 화면으로 이동
  const goBack = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 필수 항목이 입력되지 않았을 때 알림 띄우기
    if (!name || !ownerName) {
      alert("필수 항목을 꼭 입력해주세요.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("speciesName", speciesName);
      formData.append("name", name);
      formData.append("charOne", charOne);
      formData.append("charTwo", charTwo);
      formData.append("ownerName", ownerName);
      formData.append("favoritePlay", favoritePlay);
      formData.append("favoriteSnack", favoriteSnack);
      formData.append("favoriteTime", favoriteTime);
      formData.append("habit", habit);
      formData.append("favoritePlace", favoritePlace);
      formData.append("routine", routine);
      if (petPhoto) {
        formData.append("petPhoto", petPhoto);
      }
      formData.append("passed_date", passed_date);
      /*const formattedDate = passed_date.toISOString(); // Date 객체를 ISO 형식의 문자열로 변환
        formData.append("passed_date", formattedDate);*/
      formData.append("furColor", furColor);
      formData.append("kind", kind);

      const formDataObject = {};
      formData.forEach((value, key) => {
        formDataObject[key] = value;
      });
      const jsonData = JSON.stringify(formDataObject);
      console.log(jsonData);

      alert("페르소나 생성이 완료되었습니다!");
      navigate("/pages/Persona");

      const response = await axios.post(
        "https://api.rainbow-letter.com/persona/save",
        jsonData,
        {
          headers: {
            "X-ACCESS-TOKEN": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("서버 요청 실패:", error);
      // 오류 처리 로직 추가
    }
  };

  return (
    <Wrapper>
      <Container id="firstPersonaSet">
        <ImgContainer>
          <img src="/images/cat3.png" style={{ width: "300px" }} />
        </ImgContainer>
        <InputContainer>
          <h3>고양이의 이름은 무엇인가요?</h3>
          <br />
          <TextField
            required
            label="고양이 이름"
            variant="outlined"
            size="small"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <br />
          <h3>
            고양이가 당신을 어떻게 <br />
            불렀는지도 알려주세요.
          </h3>
          <br />
          <TextField
            required
            label="당신의 호칭"
            variant="outlined"
            size="small"
            helperText="언니, 형아, 엄마 등"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
          />
        </InputContainer>
      </Container>

      <Container id="secondPersonaSet">
        <InputContainer>
          <h3>고양이의 성격을 알려주세요.</h3>
          <br />
          <br />
          <InputLabel id="firstChar">첫 번째 특성</InputLabel>
          <FormControl fullWidth variant="outlined" size="small">
            <Select
              variant="outlined"
              value={charOne}
              onChange={(e) => setCharOne(e.target.value)}
              displayEmpty
            >
              <MenuItem value="" disabled>
                <em>최대 두 개 선택</em>
              </MenuItem>
              <MenuItem value="애교가 많음">애교가 많은</MenuItem>
              <MenuItem value="같이 있는 걸 좋아함">같이 있는 게 좋은</MenuItem>
              <MenuItem value="다정함">다정한</MenuItem>
              <MenuItem value="사교적임">사교적인</MenuItem>
              <MenuItem value="예민함">예민한</MenuItem>
              <MenuItem value="겁이 많음">겁이 많은</MenuItem>
              <MenuItem value="호기심이 많음">호기심이 많은</MenuItem>
              <MenuItem value="장난치는 게 좋음">장난치는 게 좋은</MenuItem>
              <MenuItem value="외향적">외향적인</MenuItem>
              <MenuItem value="활동적">활동적인</MenuItem>
              <MenuItem value="독립적">독립적인</MenuItem>
              <MenuItem value="바보 같음">바보 같은</MenuItem>
              <MenuItem value="말이 많음">말이 많은</MenuItem>
              <MenuItem value="호전적임">호전적인</MenuItem>
              <MenuItem value="소심함">소심한</MenuItem>
            </Select>
          </FormControl>
          <br />
          <InputLabel id="secondChar">두 번째 특성</InputLabel>
          <FormControl fullWidth variant="outlined" size="small">
            <Select
              variant="outlined"
              value={charTwo}
              onChange={(e) => setCharTwo(e.target.value)}
              displayEmpty
            >
              <MenuItem value="" disabled>
                <em>최대 두 개 선택</em>
              </MenuItem>
              <MenuItem value="애교가 많음">애교가 많은</MenuItem>
              <MenuItem value="같이 있는 걸 좋아함">같이 있는 게 좋은</MenuItem>
              <MenuItem value="다정함">다정한</MenuItem>
              <MenuItem value="사교적임">사교적인</MenuItem>
              <MenuItem value="예민함">예민한</MenuItem>
              <MenuItem value="겁이 많음">겁이 많은</MenuItem>
              <MenuItem value="호기심이 많음">호기심이 많은</MenuItem>
              <MenuItem value="장난치는 게 좋음">장난치는 게 좋은</MenuItem>
              <MenuItem value="외향적">외향적인</MenuItem>
              <MenuItem value="활동적">활동적인</MenuItem>
              <MenuItem value="독립적">독립적인</MenuItem>
              <MenuItem value="바보 같음">바보 같은</MenuItem>
              <MenuItem value="말이 많음">말이 많은</MenuItem>
              <MenuItem value="호전적임">호전적인</MenuItem>
              <MenuItem value="소심함">소심한</MenuItem>
            </Select>
          </FormControl>
        </InputContainer>
        <ImgContainer>
          <img src="/images/cat2.png" style={{ width: "300px" }} />
        </ImgContainer>
      </Container>

      <Container id="thirdPersonaSet">
        <ImgContainer>
          <img src="/images/cat1.png" style={{ width: "300px" }} />
        </ImgContainer>
        <InputContainer>
          <h3>고양이는 어떤 캐릭터인가요?</h3>
          <br />
          <br />
          <InputLabel id="favoritePlay">좋아하는 놀이</InputLabel>
          <FormControl fullWidth variant="outlined" size="small">
            <Select
              variant="outlined"
              value={favoritePlay}
              onChange={(e) => setFavoritePlay(e.target.value)}
              displayEmpty
            >
              <MenuItem value="" disabled>
                <em>--선택 안함--</em>
              </MenuItem>
              <MenuItem value="사냥!">사냥!</MenuItem>
              <MenuItem value="인형 놀이">인형 놀이</MenuItem>
              <MenuItem value="창 밖을 보기">창 밖을 보기</MenuItem>
              <MenuItem value="새 구경하기">새 구경하기</MenuItem>
              <MenuItem value="낚싯대 쫓기">낚싯대 쫓기</MenuItem>
              <MenuItem value="영상 보기">영상 보기</MenuItem>
              <MenuItem value="벌레 잡기">벌레 잡기</MenuItem>
              <MenuItem value="현관 산책">현관 산책</MenuItem>
              <MenuItem value="집사 손과 놀기">집사 손과 놀기</MenuItem>
              <MenuItem value="">(직접입력)</MenuItem>
            </Select>
          </FormControl>

          <br />

          <InputLabel id="favoriteSnack">좋아하는 간식</InputLabel>
          <FormControl fullWidth variant="outlined" size="small">
            <Select
              variant="outlined"
              value={favoriteSnack}
              onChange={(e) => setFavoriteSnack(e.target.value)}
              displayEmpty
            >
              <MenuItem value="" disabled>
                <em>--선택 안함--</em>
              </MenuItem>
              <MenuItem value="건조 트릿">건조 트릿</MenuItem>
              <MenuItem value="습식">습식</MenuItem>
              <MenuItem value="캣그라스">캣그라스</MenuItem>
              <MenuItem value="츄르">액체 간식(츄르)</MenuItem>
              <MenuItem value="건강한 간식">건강한 간식</MenuItem>
              <MenuItem value="고구마">고구마</MenuItem>
              <MenuItem value="펫밀크">펫밀크</MenuItem>
              <MenuItem value="해산물">해산물</MenuItem>
              <MenuItem value="캣닙">캣닙</MenuItem>
            </Select>
          </FormControl>

          <br />

          <InputLabel id="favoriteTime">좋아하는 시간</InputLabel>
          <FormControl fullWidth variant="outlined" size="small">
            <Select
              variant="outlined"
              value={favoriteTime}
              onChange={(e) => setFavoriteTime(e.target.value)}
              displayEmpty
            >
              <MenuItem value="" disabled>
                <em>--선택 안함--</em>
              </MenuItem>
              <MenuItem value="새벽">새벽</MenuItem>
              <MenuItem value="아침">아침</MenuItem>
              <MenuItem value="오전">오전</MenuItem>
              <MenuItem value="점심">점심</MenuItem>
              <MenuItem value="오후">오후</MenuItem>
              <MenuItem value="저녁">저녁</MenuItem>
              <MenuItem value="밤">밤</MenuItem>
            </Select>
          </FormControl>

          <br />

          <InputLabel id="favoritePlace">좋아하는 장소</InputLabel>
          <FormControl fullWidth variant="outlined" size="small">
            <Select
              variant="outlined"
              value={favoritePlace}
              onChange={(e) => setFavoritePlace(e.target.value)}
              displayEmpty
            >
              <MenuItem value="" disabled>
                <em>--선택 안함--</em>
              </MenuItem>
              <MenuItem value="높은 가구 위">높은 가구 위</MenuItem>
              <MenuItem value="캣타워">캣타워</MenuItem>
              <MenuItem value="창문 앞">창문 앞</MenuItem>
              <MenuItem value="침대">침대</MenuItem>
              <MenuItem value="베란다">베란다</MenuItem>
              <MenuItem value="집사의 의자">집사의 의자</MenuItem>
              <MenuItem value="애착 인형 옆">애착 인형 옆</MenuItem>
              <MenuItem value="소파">소파</MenuItem>
              <MenuItem value="현관">현관</MenuItem>
              <MenuItem value="쿠션">쿠션</MenuItem>
              <MenuItem value="바구니 안">바구니 안</MenuItem>
              <MenuItem value="집사 곁">집사 곁</MenuItem>
              <MenuItem value="숨숨집">숨숨집</MenuItem>
              <MenuItem value="발매트">발매트</MenuItem>
              <MenuItem value="">(직접입력)</MenuItem>
            </Select>
          </FormControl>

          <br />

          <InputLabel id="habit">자주 하던 행동</InputLabel>
          <FormControl fullWidth variant="outlined" size="small">
            <Select
              variant="outlined"
              value={habit}
              onChange={(e) => setHabit(e.target.value)}
              displayEmpty
            >
              <MenuItem value="" disabled>
                <em>--선택 안함--</em>
              </MenuItem>
              <MenuItem value="갑자기 뛰어다니기">갑자기 뛰어다니기</MenuItem>
              <MenuItem value="숨바꼭질">숨바꼭질</MenuItem>
              <MenuItem value="골골골 노래 부르기">골골골 노래 부르기</MenuItem>
              <MenuItem value="집사 찾아오기">집사 찾아오기</MenuItem>
              <MenuItem value="우다다">우다다</MenuItem>
              <MenuItem value="그루밍">그루밍</MenuItem>
              <MenuItem value="꾹꾹이">꾹꾹이</MenuItem>
              <MenuItem value="잠 자기">잠 자기</MenuItem>
              <MenuItem value="새 구경하기">새 구경하기</MenuItem>
              <MenuItem value="갑자기 사냥 모드">갑자기 사냥 모드</MenuItem>
              <MenuItem value="">(직접입력)</MenuItem>
            </Select>
          </FormControl>

          <br />

          <InputLabel id="routine">일상적인 루틴</InputLabel>
          <FormControl fullWidth variant="outlined" size="small">
            <Select
              variant="outlined"
              value={routine}
              onChange={(e) => setRoutine(e.target.value)}
              displayEmpty
            >
              <MenuItem value="" disabled>
                <em>--선택 안함--</em>
              </MenuItem>
              <MenuItem value="간식 조르기">간식 조르기</MenuItem>
              <MenuItem value="낮잠">낮잠</MenuItem>
              <MenuItem value="아침 일찍 집사 깨우기">
                아침 일찍 집사 깨우기
              </MenuItem>
              <MenuItem value="집사 맞이">집사 맞이</MenuItem>
              <MenuItem value="컨셉 놀이">컨셉 놀이</MenuItem>
              <MenuItem value="">(직접입력)</MenuItem>
            </Select>
          </FormControl>
        </InputContainer>
      </Container>

      <Container id="fourthPersonaSet">
        <InputContainer>
          <h3>고양이가 무지개 다리를 건넌 날을 알려주세요.</h3>
          <br />
          <br />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="기일 입력"
                value={passed_date}
                onChange={(date) => setPassedDate(date)}
              />
            </DemoContainer>
          </LocalizationProvider>
        </InputContainer>
        <ImgContainer>
          <img src="/images/cat4.png" style={{ width: "250px" }} />
        </ImgContainer>
      </Container>

      <Container id="fifthPersonaSet">
        <ImgContainer>
          <img src="/images/cat5.png" style={{ width: "300px" }} />
        </ImgContainer>
        <InputContainer>
          <h3>고양이가 어떻게 생겼나요?</h3>
          <br />
          <br />
          <TextField
            required
            label="고양이의 종(species)"
            variant="outlined"
            size="small"
            value={kind}
            onChange={(e) => setKind(e.target.value)}
          />
          <br />

          <InputLabel id="furColor">털 색깔</InputLabel>
          <FormControl fullWidth variant="outlined" size="small">
            <Select
              variant="outlined"
              value={furColor}
              onChange={(e) => setFurColor(e.target.value)}
              displayEmpty
            >
              <MenuItem value="" disabled>
                <em>--선택 안함--</em>
              </MenuItem>
              <MenuItem value="흰색">흰색</MenuItem>
              <MenuItem value="검은색">검은색</MenuItem>
              <MenuItem value="노란색">노란색</MenuItem>
              <MenuItem value="회색">회색</MenuItem>
              <MenuItem value="고등어">고등어</MenuItem>
              <MenuItem value="치즈">치즈</MenuItem>
              <MenuItem value="삼색">삼색</MenuItem>
              <MenuItem value="턱시도">턱시도</MenuItem>
              <MenuItem value="스모크">스모크</MenuItem>
              <MenuItem value="망토">망토</MenuItem>
              <MenuItem value="포인트">포인트</MenuItem>
              <MenuItem value="세피아">세피아</MenuItem>
              <MenuItem value="밍크">밍크</MenuItem>
              <MenuItem value="바이컬러">바이컬러</MenuItem>
            </Select>
          </FormControl>
        </InputContainer>
      </Container>

      <br />

      <Container id="sixthPersonaSet">
        <InputContainer>
          <h3>고양이의 사진을 올려주세요.</h3>
          <br />
          <br />
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload}>이미지 업로드</button>
        </InputContainer>
        <ImgContainer>
          <img src="/images/cat6.png" style={{ width: "200px" }} />
        </ImgContainer>
      </Container>
      <Finished />
      <div className="scroll-buttons">
        {showTopButton && (
          <button className="top-button" onClick={scrollToTop}>
            Top
          </button>
        )}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: auto;
  width: 1000px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Container = styled.div`
  margin: 100px auto;
  width: 1000px;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 1px solid gray;
`;
const ImgContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 0;
  img {
    width: 200px;
  }
  border: 1px solid blue;
`;
const InputContainer = styled.div`
  margin: 0;
  display: flex;
  flex-direction: column;
  font-size: 20px;
  border: 1px solid red;
`;
export default PersonaCat;
