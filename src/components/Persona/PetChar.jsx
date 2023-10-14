import React, { useState } from "react";
import styled from "styled-components";

import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

function PetChar() {
  const [charOne, setCharOne] = useState(null);
  const [charTwo, setCharTwo] = useState(null);

  return (
    <InputContainer>
      <h3>반려동물의 성격을 알려주세요.</h3>
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
  );
}

const InputContainer = styled.div`
  margin: 0;
  display: flex;
  flex-direction: column;
  font-size: 20px;
`;

export default PetChar;
