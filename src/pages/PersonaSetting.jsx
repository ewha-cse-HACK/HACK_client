import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import "./style.css";

function PersonaSetting() {
  const [speciesName, setSpeciesName] = useState("");
  const [name, setName] = useState("");
  const [charOne, setCharOne] = useState("");
  const [charTwo, setCharTwo] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [favoritePlay, setFavoritePlay] = useState("");
  const [customPlay, setCustomPlay] = useState("");
  const [favoriteSnack, setFavoriteSnack] = useState("");
  const [favoriteTime, setFavoriteTime] = useState("");
  const [habit, setHabit] = useState("");
  const [favoritePlace, setFavoritePlace] = useState("");
  const [routine, setRoutine] = useState("");
  const [petImage, setPetImage] = useState(null);
  const [passed_date, setPassedDate] = useState(null);
  const navigate = useNavigate();
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowTopButton(true);
      } else {
        setShowTopButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 페이지 맨 위로 스크롤하는 함수
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    const targetElement = document.getElementById("targetElement");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 필수 항목이 입력되지 않았을 때 알림 띄우기
    if (!speciesName || !name || !ownerName) {
      alert("모든 항목을 입력해주세요.");
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

      formData.forEach((value, key) => {
        console.log(key, value);
      });
      alert("페르소나 생성이 완료되었습니다!");
      navigate("/pages/PersonaView");

      const response = await axios.post(
        "http://13.209.173.241:8080/rainbow-letter/persona/save",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {
      console.error("서버 요청 실패:", error);
      // 오류 처리 로직 추가
    }
  };

  return (
    <SettingWrapper>
      <div id="startPersona">
        <h1>지금부터 무지개 다리 너머로 편지를 보내볼까요?</h1>
        <ImageStyled src="/images/letter1.png" />
        <h2>편지를 받을 당신의 가족에 대해 알려주세요.</h2>
        <h5>
          앞으로 몇 가지 질문을 통해 누구에게 편지를 보낼지 알아볼 거예요.
        </h5>
        <h5>반려동물을 다시 만나러 가봅시다! (약 3분 가량 소요 예정)</h5>
        <button id="goToCreate" onClick={handleScroll}>
          페르소나 설정 시작!
        </button>
      </div>
      <div id="targetElement">
        <form onSubmit={handleSubmit}>
          <div id="species">
            <h1>당신은 어떤 친구와 함께했나요?</h1>
            <h4>반려동물의 종을 선택해주세요!</h4>
            <div className="btn-container">
              <div className="btn-grid">
                <div
                  className="speciesButton"
                  id="bt1"
                  onClick={() => setSpeciesName("dog")}
                >
                  <img src="/images/dog.png" alt="강아지" />
                </div>
                <div
                  className="speciesButton"
                  id="bt2"
                  onClick={() => setSpeciesName("cat")}
                >
                  <img src="/images/cat.png" alt="고양이" />
                </div>
                <div
                  className="speciesButton"
                  id="bt3"
                  onClick={() => setSpeciesName("bird")}
                >
                  <img src="/images/bird.png" alt="새" />
                </div>
                <div
                  className="speciesButton"
                  id="bt4"
                  onClick={() => setSpeciesName("hamster")}
                >
                  <img src="/images/mouse.png" alt="햄스터" />
                </div>
              </div>
              <div
                className="notHereBtn"
                onClick={() => setSpeciesName("others")}
              >
                <img src="/images/not_here.png" alt="앗! 여기 없어요" />
              </div>
            </div>
          </div>
          <div id="name">
            <h1>반려동물의 이름은 무엇인가요?</h1>
            <input
              type="text"
              id="name"
              value={name}
              placeholder="반려동물의 이름"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div id="character">
            <h4>반려동물이 어떤 성격인가요?</h4>
            <p>(최대 두 개의 성격을 입력할 수 있습니다.)</p>
            <select
              id="charOne"
              value={charOne}
              onChange={(e) => setCharOne(e.target.value)}
            >
              <option value="null">--선택안함--</option>
              <option value="calm">차분함</option>
              <option value="active">활발함</option>
              <option value="chatter">수다스러움</option>
              <option value="quiet">과묵함</option>
              <option value="charming">애교스러움</option>
              <option value="timid">소심함</option>
              <option value="social">사교적</option>
              <option value="independent">독립적</option>
              <option value="odd">엉뚱함</option>
              <option value="distracted">산만함</option>
            </select>
            <select
              id="charTwo"
              value={charTwo}
              onChange={(e) => setCharTwo(e.target.value)}
            >
              <option value="null">--선택안함--</option>
              <option value="calm">차분함</option>
              <option value="active">활발함</option>
              <option value="chatter">수다스러움</option>
              <option value="quiet">과묵함</option>
              <option value="charming">애교스러움</option>
              <option value="timid">소심함</option>
              <option value="social">사교적</option>
              <option value="independent">독립적</option>
              <option value="odd">엉뚱함</option>
              <option value="distracted">산만함</option>
            </select>
          </div>
          <div id="ownerName">
            <h1>보내는 사람을 적어주세요!</h1>
            <p>
              반려동물이 알아볼 수 있도록, 당신을 부르던 호칭에 대해 알려주세요.{" "}
              <br />
              아니면 당신이 반려동물에게 불리고 싶은 호칭을 적어도 좋아요.
            </p>
            <input
              type="text"
              id="ownerName"
              value={ownerName}
              placeholder="당신의 호칭"
              onChange={(e) => setOwnerName(e.target.value)}
            />
          </div>
          <div id="textBox">
            <h4>반려동물에 대한 당신의 기억들을 알려주세요.</h4>
            <h5>
              고르지 않아도 되지만, 알려주면 더 자연스럽게 대화할 수 있어요!
            </h5>
          </div>
          <div id="more">
            <div id="selectGroup">
              <select
                id="favoritePlay"
                value={favoritePlay}
                onChange={(e) => setFavoritePlay(e.target.value)}
              >
                <option value="null">좋아하는 놀이</option>
                <option value="산책">산책</option>
                <option value="사냥 놀이">사냥 놀이</option>
                <option value="숨바꼭질">숨바꼭질</option>
                <option value="터그">터그</option>
                <option value="간식 찾기">간식 찾기</option>
                <option value="직접 입력">직접 입력</option>
              </select>
              <select
                id="favoriteSnack"
                value={favoriteSnack}
                onChange={(e) => setFavoriteSnack(e.target.value)}
              >
                <option value="null">좋아하는 간식</option>
                <option value="츄르">츄르</option>
                <option value="트릿">트릿</option>
                <option value="닭가슴살">닭가슴살</option>
                <option value="고구마">고구마</option>
                <option value="북어포">북어포</option>
                <option value="직접 입력">직접 입력</option>
              </select>
              <select
                id="favoriteTime"
                value={favoriteTime}
                onChange={(e) => setFavoriteTime(e.target.value)}
              >
                <option value="null">좋아하는 시간</option>
                <option value="새벽">새벽</option>
                <option value="아침">아침</option>
                <option value="점심">점심</option>
                <option value="오후">오후</option>
                <option value="저녁">저녁</option>
                <option value="밤">밤</option>
                <option value="직접 입력">직접 입력</option>
              </select>
              <select
                id="habit"
                value={habit}
                onChange={(e) => setHabit(e.target.value)}
              >
                <option value="null">자주 하던 행동</option>
                <option value="멍 때리기">멍 때리기</option>
                <option value="집사 괴롭히기">집사 괴롭히기</option>
                <option value="놀아달라고 조르기">놀아달라고 조르기</option>
                <option value="잠 자기">잠 자기</option>
                <option value="뛰어다니기">뛰어다니기</option>
                <option value="직접 입력">직접 입력</option>
              </select>
              <select
                id="favoritePlace"
                value={favoritePlace}
                onChange={(e) => setFavoritePlace(e.target.value)}
              >
                <option value="null">좋아하는 장소</option>
                <option value="침대">침대</option>
                <option value="책상 위">책상 위</option>
                <option value="창문 앞">창문 앞</option>
                <option value="집사의 발치">집사의 발치</option>
                <option value="식탁">식탁</option>
                <option value="현관 앞">현관 앞</option>
                <option value="직접 입력">직접 입력</option>
              </select>
              <select
                id="routine"
                value={routine}
                onChange={(e) => setRoutine(e.target.value)}
              >
                <option value="null">일상적인 루틴</option>
                <option value="밥 달라고 보채기">밥 달라고 보채기</option>
                <option value="낮잠 자기">낮잠 자기</option>
                <option value="산책하기">산책하기</option>
                <option value="밥 먹고 나면 화장실">밥 먹고 나면 화장실</option>
                <option value="명상">명상</option>
                <option value="직접 입력">직접 입력</option>
              </select>
            </div>
          </div>
          <div id="petImage">
            <h1>반려동물의 사진을 올려주세요.</h1>
            <input type="file" onChange={handleImageChange} />
            {petImage && <img src={petImage} alt="반려동물의 사진" />}
          </div>
          <div id="passedDate">
            <h1>반려동물이 무지개별로 떠난 날은 언제인가요?</h1>
            <input
              type="date"
              id="passedDate"
              value={passed_date}
              onChange={(e) => setPassedDate(e.target.value)}
            />
          </div>
          <button id="backBtn" onClick={goBack}>
            이전
          </button>
          <button id="doneBtn" type="submit">
            완료
          </button>
        </form>
      </div>

      <div className="scroll-buttons">
        {showTopButton && (
          <button className="top-button" onClick={scrollToTop}>
            Top
          </button>
        )}
      </div>
    </SettingWrapper>
  );
}

export default PersonaSetting;

const SettingWrapper = styled.div`
  margin: auto;
  padding: 20px;
  width: 1185px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
const ImageStyled = styled.img`
  margin: auto;
  width: 50%;
  height: auto;
`;
