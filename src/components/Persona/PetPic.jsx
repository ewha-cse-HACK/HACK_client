import React, { useState } from "react";
import styled from "styled-components";

function PetPic() {
  const [petPhoto, setPetPhoto] = useState(null);

  const handleFileChange = (event) => {
    setPetPhoto(event.target.files[0]);
  };

  return (
    <InputContainer>
      <h3>반려동물의 사진을 올려주세요.</h3>
      <br />
      <br />
      <input type="file" onChange={handleFileChange} />
    </InputContainer>
  );
}

const InputContainer = styled.div`
  margin: 0;
  display: flex;
  flex-direction: column;
  font-size: 20px;
`;

export default PetPic;
