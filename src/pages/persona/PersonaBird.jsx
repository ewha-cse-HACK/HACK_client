import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import styled from "styled-components";
import axios from "axios";
import "../style.css";
// import Finished from "../../components/Persona/Finished";

function PersonaBird() {
  const speciesName = "새";
  const [name, setName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [charOne, setCharOne] = useState("");
  const [charTwo, setCharTwo] = useState("");
  const [favoritePlay, setFavoritePlay] = useState("");
  const [customPlay, setCustomPlay] = useState("");
  const [favoriteSnack, setFavoriteSnack] = useState("");
  const [favoriteTime, setFavoriteTime] = useState("");
  const [habit, setHabit] = useState("");
  const [favoritePlace, setFavoritePlace] = useState("");
  const [routine, setRoutine] = useState("");
  const [petPhoto, setPetPhoto] = useState();
  const [passed_date, setPassedDate] = useState("");
  const [furColor, setFurColor] = useState("");
  const [kind, setKind] = useState("");
  const [showTopButton, setShowTopButton] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [value, setValue] = useState(dayjs("2023-10-20"));

  const [objUrl, setObjUrl] = useState(null); //객체 URL fully
  const [uploadUrl, setUploadUrl] = useState(null); //presigned URL - 업로드할 url
  const [sendingUrl, setSendingUrl] = useState(
    "https://hack-s3bucket.s3.ap-northeast-2.amazonaws.com/petprofile/pf_bird.png"
  );
  const [desiredUrl, setDesiredUrl] = useState(null); //추출된 url

  useEffect(() => {
    const fetchUploadUrl = async () => {
      try {
        // 이미지 업로드를 위한 URL을 받아옴
        const response = await axios.get(
          `https://api.rainbow-letter.com/rainbow-letter/image?dirname=petprofile`,
          {
            headers: {
              "X-ACCESS-TOKEN": `Bearer ${token}`,
            },
          }
        );
        setUploadUrl(response.data);
        console.log("이미지 업로드 URL:", response.data);
        console.log("백엔드에 보낼 주소(기본):", sendingUrl);
      } catch (error) {
        console.error("이미지 업로드 URL 요청 실패", error);
      }
    };

    fetchUploadUrl();
  }, [token]);

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
      setPetPhoto(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file); // 파일을 data URL로 읽기
      uploadImageToS3(uploadUrl, file);
    }
  };

  function uploadImageToS3(uploadUrl, file) {
    axios
      .put(uploadUrl, file, {
        headers: {
          "Content-Type": "image/png",
        },
      })
      .then((response) => {
        console.log("S3에 업로드 후 response: ", response);

        // setObjUrl(response.config.url);
        // console.log("응답 결과 객체 URL 생성", objUrl);

        const originalUrl = response.config.url;
        console.log("업로드된 파일의 URL: ", originalUrl);

        setDesiredUrl(originalUrl.split("?")[0]);
        console.log("추출된 URL:", desiredUrl);

        setSendingUrl(desiredUrl);
        console.log("sendingUrl 업데이트: ", sendingUrl);
        //setSendingUrl(objUrl.split("?")[0]);
        //console.log("추출된 URL:", sendingUrl);
      })
      .catch((error) => console.error("S3 업로드 에러", error));
  }

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
      formData.append("petImage", sendingUrl);
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
        "https://api.rainbow-letter.com/persona/save",
        jsonData,
        {
          headers: {
            "X-ACCESS-TOKEN": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("페르소나 생성이 완료되었습니다!");
      navigate("/pages/Persona");
      console.log("페르소나 생성 완료!");
    } catch (error) {
      console.error("서버 요청 실패:", error);
      // 오류 처리 로직 추가
    }
  };

  return (
    <Wrapper>
      <Container id="firstPersonaSet">
        <ImgContainer>
          <img
            src="/images/bird1.png"
            style={{ width: "250px", marginRight: "70px" }}
          />
        </ImgContainer>
        <InputContainer>
          <h3>새의 이름은 무엇인가요?</h3>
          <br />
          <TextField
            required
            label="새의 이름"
            variant="outlined"
            size="small"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="off"
          />
          <br />
          <br />
          <h3>
            새가 당신을 어떻게 <br />
            불렀을지도 알려주세요.
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
            autoComplete="off"
          />
        </InputContainer>
      </Container>

      <Container id="secondPersonaSet">
        <InputContainer>
          <h3>새의 성격을 알려주세요.</h3>
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
              <MenuItem value={null}>--선택 안함--</MenuItem>
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
              <MenuItem value={null}>--선택 안함--</MenuItem>
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
          <img
            src="/images/bird2.png"
            style={{ width: "250px", marginLeft: "100px", marginTop: "30px" }}
          />
        </ImgContainer>
      </Container>

      <Container id="thirdPersonaSet">
        <ImgContainer id="PersonaImageCat">
          <img
            src="/images/bird3.png"
            style={{
              width: "400px",
              marginBottom: "130px",
            }}
          />
        </ImgContainer>
        <InputContainer>
          <h3>새는 어떤 캐릭터인가요?</h3>
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
              <MenuItem value={null}>--선택 안함--</MenuItem>
              <MenuItem value="휘파람 불기">휘파람 불기</MenuItem>
              <MenuItem value="춤 추기">춤 추기</MenuItem>
              <MenuItem value="노래 부르기">노래 부르기</MenuItem>
              <MenuItem value="말하기">말하기</MenuItem>
              <MenuItem value="장난감 가지고 놀기">장난감 가지고 놀기</MenuItem>
              <MenuItem value="음악 즐기기">음악 즐기기</MenuItem>
              <MenuItem value="까꿍 놀이">까꿍 놀이</MenuItem>
              <MenuItem value="계단 오르기">계단 오르기</MenuItem>
              <MenuItem value="나무와 놀기">나무와 놀기</MenuItem>
              <MenuItem value="볏짚과 놀기">볏짚과 놀기</MenuItem>
              <MenuItem value="야자잎과 놀기">야자잎과 놀기</MenuItem>
              <MenuItem value="None">(직접입력)</MenuItem>
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
              <MenuItem value={null}>--선택 안함--</MenuItem>
              <MenuItem value="과일">과일</MenuItem>
              <MenuItem value="젤리">젤리</MenuItem>
              <MenuItem value="트릿">트릿</MenuItem>
              <MenuItem value="밀웜">밀웜</MenuItem>
              <MenuItem value="건조 과일">건조 과일</MenuItem>
              <MenuItem value="무염 국수">무염 국수</MenuItem>
              <MenuItem value="해바라기 씨">해바라기 씨</MenuItem>
              <MenuItem value="밀렛">밀렛</MenuItem>
              <MenuItem value="None">(직접입력)</MenuItem>
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
              <MenuItem value={null}>--선택 안함--</MenuItem>
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
              <MenuItem value={null}>--선택 안함--</MenuItem>
              <MenuItem value="포치">포치</MenuItem>
              <MenuItem value="책상">책상</MenuItem>
              <MenuItem value="높은 곳">높은 곳</MenuItem>
              <MenuItem value="창문">창문</MenuItem>
              <MenuItem value="식탁">식탁</MenuItem>
              <MenuItem value="횃대">횃대</MenuItem>
              <MenuItem value="집사의 머리 위">집사의 머리 위</MenuItem>
              <MenuItem value="새장">새장</MenuItem>
              <MenuItem value="둥지">둥지</MenuItem>
              <MenuItem value="None">(직접입력)</MenuItem>
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
              <MenuItem value={null}>--선택 안함--</MenuItem>
              <MenuItem value="노래 부르기">노래 부르기</MenuItem>
              <MenuItem value="말 따라하기">말 따라하기</MenuItem>
              <MenuItem value="장난감 놀이">장난감 놀이</MenuItem>
              <MenuItem value="운동">운동</MenuItem>
              <MenuItem value="목욕">목욕</MenuItem>
              <MenuItem value="먹이 찾기">먹이 찾기</MenuItem>
              <MenuItem value="None">(직접입력)</MenuItem>
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
              <MenuItem value={null}>--선택 안함--</MenuItem>
              <MenuItem value="간식 조르기">간식 조르기</MenuItem>
              <MenuItem value="낮잠">낮잠</MenuItem>
              <MenuItem value="아침 일찍 집사 깨우기">
                아침 일찍 집사 깨우기
              </MenuItem>
              <MenuItem value="탐험">탐험</MenuItem>
              <MenuItem value="놀이">놀이</MenuItem>
              <MenuItem value="None">(직접입력)</MenuItem>
            </Select>
          </FormControl>
        </InputContainer>
      </Container>

      <Container id="fourthPersonaSet">
        <InputContainer>
          <h3>
            새가 무지개 다리를 <br />
            건넌 날을 알려주세요.
          </h3>
          <br />
          <br />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="기일 입력"
                value={value}
                onChange={(passed_date) => setPassedDate(passed_date)}
              />
            </DemoContainer>
          </LocalizationProvider>
          <br />
          <br />
        </InputContainer>
        <ImgContainer>
          <img
            src="/images/cat4.png"
            style={{ width: "250px", marginLeft: "80px" }}
          />
        </ImgContainer>
      </Container>

      <Container id="fifthPersonaSet">
        <ImgContainer>
          <img
            src="/images/bird4.png"
            style={{ width: "300px", marginTop: "10px", marginRight: "30px" }}
          />
        </ImgContainer>
        <InputContainer>
          <h3>새가 어떻게 생겼나요?</h3>
          <br />
          <br />
          <TextField
            required
            label="새의 종(species)"
            variant="outlined"
            size="small"
            value={kind}
            onChange={(e) => setKind(e.target.value)}
            autoComplete="off"
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
              <MenuItem value={null}>--선택 안함--</MenuItem>
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
          <h3>새의 사진을 올려 주세요.</h3>
          <br />
          <p>
            프로필 사진으로 사용될 수 있어요. <br />
            선택하지 않으면 기본 프로필이 적용됩니다.
          </p>
          <br />
          <br />
          <ImgUpload>
            <input type="file" onChange={handleImageChange} />
          </ImgUpload>
        </InputContainer>
        <ImgContainer>
          <img
            src="/images/cat6.png"
            style={{ width: "200px", marginLeft: "100px" }}
          />
        </ImgContainer>
      </Container>
      <ButtonContainer>
        <CancelButton id="backBtn" onClick={goBack}>
          취소
        </CancelButton>
        <DoneButton id="doneBtn" onClick={handleSubmit}>
          완료!
        </DoneButton>
      </ButtonContainer>
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
  width: 900px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Container = styled.div`
  margin: 100px auto;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const ImgContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const InputContainer = styled.div`
  margin: 0;
  display: flex;
  flex-direction: column;
  font-size: 20px;
  p {
    font-size: 15px;
  }
`;
const ImgUpload = styled.div`
  display: flex;
  width: 191px;
  height: 165px;
  padding: 0px 26px 0px 27px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: 2px dashed var(--Faded, rgba(0, 0, 0, 0.15));
  background: #fff;
`;
const ButtonContainer = styled.div``;

const CancelButton = styled.button`
  position: fixed;
  bottom: 20px;
  transform: translateX(-110%);
  margin: 10px;
  width: 140px;
  height: 50px;
  font-weight: bold;
  font-size: 18px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 56px;
  border: 2px solid var(--Dark-Blue, #0a2640);
  background: white;
  cursor: pointer;
`;
const DoneButton = styled.button`
  position: fixed;
  bottom: 20px;
  transform: translateX(10%);
  margin: 10px;
  width: 140px;
  height: 50px;
  font-weight: bold;
  font-size: 18px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border: none;
  border-radius: 56px;
  color: white;
  background: rgba(0, 0, 0, 0.83);
  cursor: pointer;
`;
export default PersonaBird;
