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

function PersonaCat() {
  const [speciesName, setSpeciesName] = useState("");
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

  return (
    <Wrapper>
      <ImgContainer>
        <img src="/images/cat1.png" />
      </ImgContainer>
      <InputContainer>
        <h1>고양이의 이름은 무엇인가요?</h1>
        <br />
        <TextField
          required
          label="고양이 이름"
          variant="outlined"
          value={textFieldValue}
          onChange={handleTextFieldChange}
        />
        <br />
        <br />
        <h1>고양이가 당신을 어떻게 불렀는지도 알려주세요.</h1>
        <br />
        <TextField
          required
          label="당신의 호칭"
          variant="outlined"
          value={textFieldValue}
          onChange={handleTextFieldChange}
        />
        <br />
        <br />
        <h1>고양이의 성격을 알려주세요.</h1>
        <br />
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
        <h1>고양이는 어떤 캐릭터인가요?</h1>

        <h1>고양이가 어떻게 생겼나요?</h1>

        <h1>고양이가 무지개 다리를 건넌 날을 알려주세요.</h1>

        <h1>고양이의 사진을 올려주세요.</h1>

        <h2>반려동물 페르소나 생성 완료!</h2>
        <p>
          당신의 마음이 몰랑이에게 닿았어요! <br />
          이제부터 몰랑이와 대화해볼까요?
        </p>
        <button>프로필 보기</button>
      </InputContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: auto;
  width: 1000px;
  height: 800px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const ImgContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 0;
  width: 400px;
  img {
    width: 300px;
  }
`;
const InputContainer = styled.div`
  margin: 0;
  width: 400px;
`;

export default PersonaCat;
