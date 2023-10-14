import React, { useState } from "react";
import styled from "styled-components";

import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function PetDate() {
  const [passed_date, setPassedDate] = useState(null);

  return (
    <InputContainer>
      <h3>반려동물이 무지개 다리를 건넌 날을 알려주세요.</h3>
      <br />
      <br />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            label="기일 입력"
            value={passed_date}
            onChange={(date) => setPassedDate(date)}
          />
        </DemoContainer>
      </LocalizationProvider>
    </InputContainer>
  );
}

const InputContainer = styled.div`
  margin: 0;
  display: flex;
  flex-direction: column;
  font-size: 20px;
`;
export default PetDate;
