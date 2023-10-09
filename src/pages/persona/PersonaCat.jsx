import React, { useState } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import styled from "styled-components";
import axios from "axios";
import "../style.css";

function PersonaCat() {
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
          label="Enter Text"
          variant="outlined"
          value={textFieldValue}
          onChange={handleTextFieldChange}
        />
        <br />
        <br />
        <h1>고양이가 당신을 어떻게 불렀는지도 알려주세요.</h1>
        <br />
        <Select
          label="Select Option"
          variant="outlined"
          value={selectValue}
          onChange={handleSelectChange}
        >
          <MenuItem value="option1">Option 1</MenuItem>
          <MenuItem value="option2">Option 2</MenuItem>
          <MenuItem value="option3">Option 3</MenuItem>
        </Select>
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
  margin: auto;
  width: 400px;
  img {
    width: 300px;
  }
`;
const InputContainer = styled.div`
  margin: auto;
  width: 400px;
`;

export default PersonaCat;
