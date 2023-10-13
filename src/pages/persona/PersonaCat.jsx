import React, { useState } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
// import { ArrowBack, ArrowForward } from "@mui/icons-material";
//import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
//import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
//import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
//import { DatePicker } from "@mui/x-date-pickers/DatePicker";
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

  const [textFieldValue, setTextFieldValue] = useState("");
  const [selectValue, setSelectValue] = useState("");

  const handleTextFieldChange = (event) => {
    setTextFieldValue(event.target.value);
  };

  const handleSelectChange = (event) => {
    setSelectValue(event.target.value);
  };

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
        "http://13.209.173.241:8080/rainbow-letter/persona/save",
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
          <img src="/images/cat1.png" />
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
          <img src="/images/cat2.png" />
        </ImgContainer>
      </Container>

      <Container id="thirdPersonaSet">
        <ImgContainer>
          <img src="/images/cat3.png" />
        </ImgContainer>
        <InputContainer>
          <h3>고양이는 어떤 캐릭터인가요?</h3>
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

          <Select
            label="좋아하는 놀이"
            variant="outlined"
            value={selectValue}
            onChange={handleSelectChange}
          >
            <MenuItem value="option1">차분함</MenuItem>
            <MenuItem value="option2">활발함</MenuItem>
            <MenuItem value="option3">수다스러움</MenuItem>
            <MenuItem value="option3">과묵함</MenuItem>
            <MenuItem value="option3">애교스러움</MenuItem>
            <MenuItem value="option3">소심함</MenuItem>
            <MenuItem value="option3">사교적</MenuItem>
            <MenuItem value="option3">독립적</MenuItem>
            <MenuItem value="option3">엉뚱함</MenuItem>
            <MenuItem value="option3">산만함</MenuItem>
          </Select>
          <Select
            label="좋아하는 간식"
            variant="outlined"
            value={selectValue}
            onChange={handleSelectChange}
          ></Select>
          <Select
            label="좋아하는 시간"
            variant="outlined"
            value={selectValue}
            onChange={handleSelectChange}
          ></Select>
          <Select
            label="좋아하는 장소"
            variant="outlined"
            value={selectValue}
            onChange={handleSelectChange}
          ></Select>
          <Select
            label="자주 하던 행동"
            variant="outlined"
            value={selectValue}
            onChange={handleSelectChange}
          ></Select>
          <Select
            label="일상적인 루틴"
            variant="outlined"
            value={selectValue}
            onChange={handleSelectChange}
          ></Select>
        </InputContainer>
      </Container>
      <Container id="fourthPersonaSet">
        <InputContainer>
          <h1>고양이가 무지개 다리를 건넌 날을 알려주세요.</h1>
          {/*
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker label="Basic date picker" />
            </DemoContainer>
          </LocalizationProvider>
          <DemoItem label="Responsive variant">
            <DatePicker defaultValue={dayjs("2022-04-17")} />
          </DemoItem>
          <DemoItem label="Static variant">
            <StaticDatePicker defaultValue={dayjs("2022-04-17")} />
          </DemoItem>
          */}
          <p>고양이는 0000년 0월 0일에 무지개별로 떠났어요</p>
        </InputContainer>
        <ImgContainer>
          <img src="/images/cat4.png" />
        </ImgContainer>
      </Container>
      <Container id="fifthPersonaSet">
        <ImgContainer>
          <img src="/images/cat5.png" />
        </ImgContainer>
        <InputContainer>
          <h1>고양이가 어떻게 생겼나요?</h1>
          <br />
          <TextField
            required
            label="고양이의 종(species)"
            variant="outlined"
            value={textFieldValue}
            onChange={handleTextFieldChange}
          />
          <br />
          <br />
          <Select
            label="털 색깔(무늬)"
            variant="outlined"
            value={selectValue}
            onChange={handleSelectChange}
          ></Select>
        </InputContainer>
      </Container>
      <Container id="sixthPersonaSet">
        <InputContainer>
          <h1>고양이의 사진을 올려주세요.</h1>
        </InputContainer>
        <ImgContainer>
          <img src="/images/cat6.png" />
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
