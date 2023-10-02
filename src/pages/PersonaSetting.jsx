import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import "./style.css";
import constructWithOptions from "styled-components/dist/constructors/constructWithOptions";

function PersonaSetting() {
  const [speciesName, setSpeciesName] = useState("");
  const [name, setName] = useState("");
  const [personalityOne, setPersonalityOne] = useState("");
  const [personalityTwo, setPersonalityTwo] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [favoritePlay, setFavoritePlay] = useState("");
  const [favoriteSnack, setFavoriteSnack] = useState("");
  const [favoriteTime, setFavoriteTime] = useState("");
  const [habit, setHabit] = useState("");
  const [favoritePlace, setFavoritePlace] = useState("");
  const [routine, setRoutine] = useState("");
  const [petImage, setPetImage] = useState(null);
  const [passedDate, setPassedDate] = useState("");

  const handleScroll = () => {
    const targetElement = document.getElementById("targetElement");
    targetElement.scrollIntoView({ behavior: "smooth" });
    /* or 윈도우 객체의 scrollTo()메서드를 사용해 화면 높이만큼 스크롤 내리기*/
    /*
      window.scrollTo({
      top: window.innerHeight, // 화면의 높이만큼 스크롤을 내림
      behavior: "smooth" // 부드러운 애니메이션 효과
    });
    */
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("speciesName", speciesName);
      formData.append("name", name);
      formData.append("personalityOne", personalityOne);
      formData.append("personalityTwo", personalityTwo);
      formData.append("ownerName", ownerName);
      formData.append("favoritePlay", favoritePlay);
      formData.append("favoriteSnack", favoriteSnack);
      formData.append("favoriteTime", favoriteTime);
      formData.append("habit", habit);
      formData.append("favoritePlace", favoritePlace);
      formData.append("routine", routine);
      formData.append("petImage", petImage);
      formData.append("passedDate", passedDate);

      const response = await axios.post("/species", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data); // 서버 응답 확인 - null 이라 확인할 필요 없을 것 같긴함

      // 리다이렉트 - 뷰 화면으로 이동 (프로필 새로 생성 확인)
    } catch (error) {
      console.error("데이터 저장 오류:", error);
      // 오류 처리 로직 추가
    }
  };

  return (
    <SettingWrapper>
      <div id="startPersona">
        <h1>지금부터 무지개 다리 너머로 편지를 보내볼까요?</h1>
        <ImageStyled src="/images/letter1.png" />
        <h2>편지를 받을 당신의 동물에 대해 알려주세요.</h2>
        <h5>
          앞으로 몇 가지 질문을 통해 누구에게 편지를 보낼지 알아볼 거예요,
        </h5>
        <h5>당신의 편지를 기다리고 있을 가족을 위해 힘내서 만들어 보아요!</h5>
        {/* 클릭 시 스크롤 이동하는 Link */}
        <Link to="#" onClick={handleScroll}></Link>
        <button id="goToCreate" type="submit">
          페르소나 설정 시작!
        </button>
      </div>
      <div id="targetElement"></div> {/* 스크롤 이동할 대상 요소 */}
    </SettingWrapper>
  );
}

export default PersonaSetting;

const SettingWrapper = styled.div`
  margin: auto;
  padding: 20px;
  width: 1185px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
const ImageStyled = styled.img`
  margin: auto;
  width: 50%;
  height: auto;
`;
