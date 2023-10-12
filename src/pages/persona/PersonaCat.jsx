import React, { useState } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
// import { ArrowBack, ArrowForward } from "@mui/icons-material";
import styled from "styled-components";
import axios from "axios";
import "../style.css";
import Finished from "../../components/Persona/Finished";

function PersonaCat() {
  const speciesName = "고양이";
  const [name, setName] = useState("");
  const [charOne, setCharOne] = useState(null);
  const [charTwo, setCharTwo] = useState(null);
  const [ownerName, setOwnerName] = useState("");
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
          <InputLabel htmlFor="name">이름</InputLabel>
          <TextField id="name" variant="outlined" />
          <TextField
            required
            label="고양이 이름"
            helperText="도움말 텍스트"
            variant="outlined"
            size="small"
            value={name}
            onChange={handleTextFieldChange}
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
            value={textFieldValue}
            onChange={handleTextFieldChange}
          />
        </InputContainer>
      </Container>

      <Container id="secondPersonaSet">
        <InputLabel id="demo-select-label">선택하세요</InputLabel>
        <Select
          labelId="demo-select-label"
          id="demo-select"
          label="선택하세요"
          variant="outlined"
        >
          {/* 옵션들 */}
        </Select>
        <InputContainer>
          <h1>고양이의 성격을 알려주세요.</h1>
          <br />
          <FormControl fullWidth variant="outlined" size="small">
            <Select
              value={selectValue}
              onChange={handleSelectChange}
              label="Placeholder 텍스트"
              displayEmpty
            >
              <MenuItem value="" disabled>
                <em>선택하세요</em>
              </MenuItem>
              <MenuItem value="option1">옵션 1</MenuItem>
              <MenuItem value="option2">옵션 2</MenuItem>
              <MenuItem value="option3">옵션 3</MenuItem>
            </Select>
          </FormControl>
          <Select
            label="첫 번째 특성"
            placeholder="고양이의 성격"
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
            label="두 번째 특성"
            placeholder="고양이의 성격"
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
          <h1>고양이는 어떤 캐릭터인가요?</h1>
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
`;
const ImgContainer = styled.div`
  display: flex;
  margin: 0;
  width: 400px;
  img {
    width: 200px;
  }
`;
const InputContainer = styled.div`
  margin: 0;
  display: flex;
  flex-direction: column;
  font-size: 20px;
`;

export default PersonaCat;
