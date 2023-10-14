import React, { useState } from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";

function PetName() {
  const [name, setName] = useState("");
  const [ownerName, setOwnerName] = useState("");

  return (
    <InputContainer>
      <h3>반려동물의 이름은 무엇인가요?</h3>
      <br />
      <TextField
        required
        label="고양이 이름"
        variant="outlined"
        size="small"
        value={name}
        onChange={(e) => setName(e.target.value)}
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
        size="small"
        helperText="언니, 형아, 엄마 등"
        value={ownerName}
        onChange={(e) => setOwnerName(e.target.value)}
      />
    </InputContainer>
  );
}

const InputContainer = styled.div`
  margin: 0;
  display: flex;
  flex-direction: column;
  font-size: 20px;
`;

export default PetName;
