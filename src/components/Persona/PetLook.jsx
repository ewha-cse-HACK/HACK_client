import React, { useState } from "react";
import styled from "styled-components";

import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

function PetLook() {
  const [furColor, setFurColor] = useState(null);
  const [kind, setKind] = useState(null);

  return (
    <InputContainer>
      <h3>반려동물이 어떻게 생겼나요?</h3>
      <br />
      <br />
      <TextField
        required
        label="고양이의 종(species)"
        variant="outlined"
        size="small"
        value={kind}
        onChange={(e) => setKind(e.target.value)}
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
          <MenuItem value="" disabled>
            <em>--선택 안함--</em>
          </MenuItem>
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
  );
}

const InputContainer = styled.div`
  margin: 0;
  display: flex;
  flex-direction: column;
  font-size: 20px;
`;

export default PetLook;
