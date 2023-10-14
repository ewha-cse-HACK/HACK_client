import React, { useState } from "react";
import styled from "styled-components";

import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

function PetLike() {
  const [favoritePlay, setFavoritePlay] = useState(null);
  const [customPlay, setCustomPlay] = useState(null);
  const [favoriteSnack, setFavoriteSnack] = useState(null);
  const [favoriteTime, setFavoriteTime] = useState(null);
  const [habit, setHabit] = useState(null);
  const [favoritePlace, setFavoritePlace] = useState(null);
  const [routine, setRoutine] = useState(null);

  return (
    <InputContainer>
      <h3>반려동물은 어떤 캐릭터인가요?</h3>
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
  );
}

const InputContainer = styled.div`
  margin: 0;
  display: flex;
  flex-direction: column;
  font-size: 20px;
`;
export default PetLike;
