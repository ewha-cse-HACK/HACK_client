import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import styled from "styled-components";
import axios from "axios";
import "../style.css";

function PersonaDog() {
  const speciesName = "강아지";
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
  const [petImage, setPetImage] = useState(null);
  const [passed_date, setPassedDate] = useState(null);
  const [furColor, setFurColor] = useState(null);
  const [kind, setKind] = useState(null);

  const navigate = useNavigate();
  const [showTopButton, setShowTopButton] = useState(false);
  const token = localStorage.getItem("token");

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // 선택한 파일
    const reader = new FileReader();

    reader.onloadend = () => {
      // 파일을 읽고 이미지 URL을 상태에 저장
      setPetImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file); // 파일을 data URL로 읽기
    }
  };

  // 이전 화면으로 이동
  const goBack = () => {
    navigate(-1);
  };

  // 페이지 맨 위로 스크롤하는 함수
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      if (petImage) {
        formData.append("petImage", petImage);
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
      //서버에 전송 잘 되면 알림 뜨는 걸로 변경 필요
      alert("페르소나 생성이 완료되었습니다!");
      navigate("/pages/Persona");
    } catch (error) {
      console.error("서버 요청 실패:", error);
      alert("전송에 실패했습니다. 오류를 확인해주세요.");
      // 오류 처리 로직 추가
    }
  };

  return (
    <DogWrapper>
      {/** 
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth variant="outlined" margin="normal">

          <h3>강아지의 이름은 무엇인가요?</h3>
          <InputLabel htmlFor="favoritePlay">좋아하는 놀이</InputLabel>
          <Select
            label="좋아하는 놀이"
            id="favoritePlay"
            value={favoritePlay}
            onChange={(e) => setFavoritePlay(e.target.value)}
          >
            <MenuItem value="null">좋아하는 놀이</MenuItem>
            <MenuItem value="산책">산책</MenuItem>
            <MenuItem value="사냥 놀이">사냥 놀이</MenuItem>
            <MenuItem value="숨바꼭질">숨바꼭질</MenuItem>
          </Select>
        </FormControl>
        <Button id="backBtn" variant="outlined" color="blue" onClick={goBack}>
          이전
        </Button>
        <Button id="doneBtn" type="submit" variant="contained" color="red">
          완료
        </Button>
      </form>*/}
    </DogWrapper>
  );
}
const DogWrapper = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 1000px;
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

export default PersonaDog;
